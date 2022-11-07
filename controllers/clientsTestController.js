const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

const buffer = require('buffer/').Buffer;
const fetch = require('node-fetch');
const { URLSearchParams } = require('node:url');


const createFolder = require('./createFolder')
///
var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
//var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
let tokenFromRefresh; // THIS VARIABLE WILL STORE THE ACCESS_TOKEN GIVEN FROM THE REFRESH



const DBXCLIENT_ID = process.env.DBX_CLIENT_ID;
const CLIENT_SECRET = process.env.DBX_CLIENT_SECRET;

const config = {
    clientId: DBXCLIENT_ID,
    clientSecret: CLIENT_SECRET,
};
const dbx = new Dropbox(config);
////


const connectDropbox = async ()=>{
  const clientIdSecretEncoded = buffer.from(`${DBXCLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);
    const requestOptions = {
       method: 'POST',
        headers: {
            "Authorization": `Basic ${clientIdSecretEncoded}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencoded,
        redirect: 'follow'
    };
    try {
      const res= fetch("https://api.dropbox.com/oauth2/token", requestOptions)
      const response = await res
      const response1 = await response.json()
      console.log("response1",response1)
      const accessTokenResult = await response1.access_token
      tokenFromRefresh =  accessTokenResult
      console.log("tokenFromRefresh",tokenFromRefresh)
      return tokenFromRefresh

     }
      catch{
          (error => console.log('error from connectDropboxA', error))}
  }




const createClientSharedMainFolder = async (clientID,folderName)=>{
console.log("creating",folderName)
  try {
  const getData= await axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_${folderName.toUpperCase()}`,
      "shared_link_policy": "anyone"
  }
  })
  const dataResponse = await getData 
  const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(dataResponse.data.preview_url,folderName,clientID): createClientSharedMainFolder(clientID,folderName)
  }  catch(e){
    console.log("an error ocurred sharing ", e)
      }

}




module.exports = {
  getClientById: async (req, res) => {
    let { clientid } = await req.params;
    console.log("clientid",clientid)
    const query = {
      text: "select * from clients where clientid=$1",
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }
  },
  getClients: async (req, res) => {
    try {
      const allData = await db.query("select * from clients");
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  getClientsForServicesPage: async (req, res) => {
    try {
      const allData = await db.query(`select clients.*, progress_note.progressnotedate  as progressnotedate,services_action_plan.planstartdate as sapstartdate 
      from clients 
      full outer join progress_note  on clients.clientid = progress_note.clientid
      full outer join services_action_plan on clients.clientid = services_action_plan.clientid`);
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  getClientsForDashboardPage:async(req,res)=>{
    const text = `select clients.*, msa_form.id as msaformid from clients 
    full outer join msa_form on clients.clientid = msa_form.clientid where clients.clientid is not null`

    try {
      const allData = await db.query(text);
      const response = allData.rows;
      console.log("response client dash")
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  getClientProfileData: async (req,res)=>{
    let {clientid} = req.params

    for (const property in req.body.clientData) {
      if(req.body.clientData[property]==='1'){
        req.body.clientData[property]=true
      }
      if(req.body.clientData[property]==='0'){
        req.body.clientData[property]=false
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
    } 
      const query = {
      text: `
      select clients.clientid,
      clients.id,
      clients.clientfirstname ,
      clients.clientlastname ,
      clients.clienthcwid ,
      clients.clienthcwname ,
      clients.clienthcwlastname ,
      clients.clientdatecreated ,
      clients.clientcategory,
      clients.clientactive,
      clients.clienthcwemail,
      msa_form.clientid as msaClientId, 
      msa_form.id as msaFormID,
      msa_form.airsintakeform as msaFormAIRSINTAKEFORM,
      msa_form.comprehensiveriskbehaviorassessment as msaformcomprehensiveriskbehavrioassesment,
      msa_form.hnseligibilityform as msahnselegibilityform,
      msa_form.hnsreadinessform as msaformhnsreadinessform,
      services_action_plan.clientid as servicesactionplanid,
      services_action_plan.goal1completed ,
      services_action_plan.goal2completed ,
      services_action_plan.goal3completed,
      services_action_plan.goal1completiondate  ,
      services_action_plan.goal2completiondate ,
      services_action_plan.goal3completiondate,
      services_action_plan.planstartdate,
      progress_note.id as progress_note_id,
      progress_note.progressnotedate as progressnotedate  
      from clients 
      full outer join msa_form on clients.clientid=msa_form.clientid 
      full outer join services_action_plan on clients.clientid = services_action_plan.clientid
      full outer join progress_note on clients.clientid = progress_note.clientid 
      where clients.clientid=$1`,
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }


  },
  getClientProfileDataByClientUniqueId: async (req,res)=>{
    let {clientid} = req.params

    for (const property in req.body.clientData) {
      if(req.body.clientData[property]==='1'){
        req.body.clientData[property]=true
      }
      if(req.body.clientData[property]==='0'){
        req.body.clientData[property]=false
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
    } 
      const query = {
      text: `
      select clients.clientid,
      clients.id,
      clients.clientfirstname ,
      clients.clientlastname ,
      clients.clienthcwid ,
      clients.clienthcwname ,
      clients.clienthcwlastname ,
      clients.clientdatecreated ,
      clients.clientcategory,
      clients.clientactive,
      clients.clienthcwemail,
      msa_form.clientid as msaClientId, 
      msa_form.id as msaFormID,
      msa_form.airsintakeform as msaFormAIRSINTAKEFORM,
      msa_form.comprehensiveriskbehaviorassessment as msaformcomprehensiveriskbehavrioassesment,
      msa_form.hnseligibilityform as msahnselegibilityform,
      msa_form.hnsreadinessform as msaformhnsreadinessform,
      services_action_plan.clientid as servicesactionplanid,
      services_action_plan.goal1completed ,
      services_action_plan.goal2completed ,
      services_action_plan.goal3completed,
      services_action_plan.goal1completiondate  ,
      services_action_plan.goal2completiondate ,
      services_action_plan.goal3completiondate,
      services_action_plan.planstartdate,
      progress_note.id as progress_note_id,
      progress_note.progressnotedate as progressnotedate  
      from clients 
      full outer join msa_form on clients.clientid=msa_form.clientid 
      full outer join services_action_plan on clients.clientid = services_action_plan.clientid
      full outer join progress_note on clients.clientid = progress_note.clientid 
      where clients.clientid=$1`,
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("respoinse",response)
      let newClient={}
      let progressnotes=[]
      let pn={}

 /*      console.log("response",response); */
      const createClient = (response)=>{

        response.forEach((client,index)=>{
        newClient.clientid=client.clientid
        newClient.id=client.id
        newClient.clientfirstname=client.clientfirstname
        newClient.clientlastname=client.clientlastname
        newClient.clienthcwid=client.clienthcwid,
        newClient.clienthcwname=client.clienthcwname
        newClient.clienthcwlastname=client.clienthcwlastname
        newClient.clientdatecreated=client.clientdatecreated
        newClient.clientcategory=client.clientcategory
        newClient.clientactive=client.clientactive
        newClient.clienthcwemail=client.clienthcwemail
        newClient.msaclientid=client.msaclientid
        newClient.msaformid=client.msaformid
        newClient.msaformairsintakeform=client.msaformairsintakeform
        newClient.msaformcomprehensiveriskbehavrioassesment=client.msaformcomprehensiveriskbehavrioassesment
        newClient.msahnselegibilityform=client.msahnselegibilityform
        newClient.msaformhnsreadinessform=client.msaformhnsreadinessform
        newClient.servicesactionplanid=client.servicesactionplanid
        newClient.goal1completed=client.goal1completed
        newClient.goal2completed=client.goal2completed
        newClient.goal3completed=client.goal3completed
        newClient.goal1completiondate=client.goal1completiondate
        newClient.goal2completiondate=client.goal2completiondate
        newClient.goal3completiondate=client.goal3completiondate
        newClient.planstartdate=client.planstartdate
        pn={id:client.progress_note_id,date:client.progressnotedate}
        progressnotes.push(pn)
        newClient.progressnotes=progressnotes
        })

      }
     
      createClient(response)

      console.log("newClient",newClient);
      res.send([newClient]);
    } catch (e) {
      console.log("response error",e);
    }


  },
  createClient: async (req, res) => {
    let {
      clientFirstName,
      clientLastName,
      clientSSN,
      clientActive,
      clientHCWID,
      clientHCWName,
      clientHCWLastname,
      clientID,
      clientDateCreated,
      clientHCWemail,
      clientCategory
    } = req.body;

    const nameCapitalized =
      clientFirstName.charAt(0).toUpperCase().trim() + clientFirstName.slice(1).trim();
    const lastnameCapitalized =
      clientLastName.charAt(0).toUpperCase() + clientLastName.slice(1);

    if ((clientActive = "true")) {
      clientActive = "1";
    } else {
      clientActive = "0";
    }
    checkSSN(clientID);
    function checkSSN(clientID) {
      const query1 = {
        text: "select * from clients where clientid=$1",
        values: [clientID],
      };

      db.query(query1)
        .then((data) => {
          if (data.rows.length > 0) {
            res.status(400).send("Client is already registered");
          } else {
            const query = {
              text: "INSERT INTO clients(clientfirstname,clientlastname,clientssn,clientactive,clienthcwid,clienthcwname,clienthcwlastname,clientid,clientdatecreated,clienthcwemail,clientcategory) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
              values: [
                nameCapitalized,
                lastnameCapitalized,
                clientSSN,
                clientActive,
                clientHCWID,
                clientHCWName,
                clientHCWLastname,
                clientID,
                clientDateCreated,
                clientHCWemail,
                clientCategory
              ],
            };
          
            db.query(query)
              .then((data) => res.status(200).json(data.rows[0]))
              .then(newresponse =>connectDropboxAndCreateFolders(DBXCLIENT_ID,clientID))
              .catch((e) => console.error(e.stack))
          }
        })
        .catch((e) => console.log(e));
    }
  },
  updateClient:async(req,res)=>{
    console.log("req.body",req.body)

    let { 
      id,
      clientFirstName,
      clientLastName,
      clientSSN,
      clientDateCreated,
      clientActive,
      clientHCWID,
      clientHCWName,
      clientHCWLastname,
      clientID,
      clientHCWemail,
      clientCategory,
      clientIdFromDB
    } = req.body

    try {
      const query = await {
        name: "update-user",
        text: `update clients set 
        clientFirstName =$1,
        clientLastName =$2,
        clientSSN =$3,
        clientDateCreated =$4,
        clientActive =$5,
        clientHCWID =$6,
        clientHCWName =$7,
        clientHCWLastname =$8,
        clientID =$9,
        clientHCWemail =$10,
        clientCategory =$11,
        id=$12
        where id=$12`,
        values: [clientFirstName,
          clientLastName,
          clientSSN,
          clientDateCreated,
          clientActive,
          clientHCWID,
          clientHCWName,
          clientHCWLastname,
          clientID,
          clientHCWemail,
          clientCategory,id]
      };
      db
        .query(query)
        .then((response) =>
          {
            console.log("sucess")
            res.send({
            status: 200,
            statusText:'OK'
          })}
        )
        
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }




  },
  deleteClient:async(req,res)=>{
    console.log(req.body)
    const { id } = req.body;
    const query = {
      text: "DELETE from clients where id=$1",
      values: [id],
    };
    // promise
    db.query(query)
      .then((data) => {
   console.log("success")
          res.send({
            status: "OK",
            message: "User deleted",
          });
     
      })
      .catch((e) => console.error(e.stack));
  },
  updateTest:async (req,res)=>{
    console.log("test de updatetest")
    const a = await connectDropbox()
  }
};


const connectDropboxAndCreateFolders=(DBXCLIENT_ID,clientID)=>{
  console.log("DBXCLIENT_ID",DBXCLIENT_ID)
  console.log("clientID",clientID)

  //GENERATE CODE FROM CLIENTID AND CLIENTSECRET TO BE USED TO REQUEST THE ACCESSTOKEN FROM REFRESH 
const clientIdSecretEncoded = buffer.from(`${DBXCLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
console.log("clientIdSecretEncoded",clientIdSecretEncoded)

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);
  console.log("urlencoded",urlencoded)
  const requestOptions = {
     method: 'POST',
      headers: {
          "Authorization": `Basic ${clientIdSecretEncoded}`,
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded,
      redirect: 'follow'
  };
  fetch("https://api.dropbox.com/oauth2/token", requestOptions)
      .then(response => response.json())
      .then(result => newAccessToken = result)
      .then(accessTokenResult => {
        console.log("accessTokenResult",accessTokenResult)
          tokenFromRefresh = accessTokenResult.access_token // ADDING TO tokenFromRefresh (GLOBAL VARIABLE) THE ACCESS TOKEN THANKS TO REFRESH
          console.log("tokenfrom",tokenFromRefresh)
          createFolders(tokenFromRefresh, clientID)/// shoul be await 
      })
      .then(result => console.log(result))
      .catch(error => console.log('error from connectDropboxAndCreateFolders', error))
}


//>>> FUNCTION THAT CREATE EACH FOLDER : crear cada carpeta  <<<<<< 
const createFolders =  async (token, CLIENT_ID) => {
  console.log("desde createFolrder token clientID",token,CLIENT_ID)
  // In the CreateFolder file (at the end), it is the function that, I believe, makes the update in the database  
 //await createFolder.createFolderIntake(token, CLIENT_ID)
 await createFolder.createFolderIntakeForm(token, CLIENT_ID)
 await createFolder.createFolderCBRA(token, CLIENT_ID)
 await createFolder.createFolderMiscellaneous(token, CLIENT_ID)
 await createFolder.createFolderMedical(token, CLIENT_ID)
 await createFolder.createFolderActionPlans(token, CLIENT_ID)
 await createFolder.createFolderConsent(token, CLIENT_ID)
 await createFolder.createFolderLinkageNavigation(token, CLIENT_ID)
 await createFolder.createFolderTicklerUpdates(token, CLIENT_ID)
 await createFolder.createFolderSupportGroups(token, CLIENT_ID)
 await createFolder.createFolderIDG(token, CLIENT_ID)

}

