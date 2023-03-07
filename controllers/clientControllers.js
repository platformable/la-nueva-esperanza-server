const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

const buffer = require('buffer/').Buffer;
const fetch = require('node-fetch');
const { URLSearchParams } = require('node:url');


const dropbox = require('../utils/dropbox')
///
var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;

//let tokenFromRefresh; 

const folders = [
  `ACTION_PLANS`,
  `CBRA`,
  `CONSENT`,
  `IDG`,
  `INTAKE`,
  `LINKAGE_NAVIGATION`,
  `MEDICAL`,
  `MISCELLANEOUS`,
  `SUPPORT_GROUPS`,
  `TICKLER_UPDATES`,
]


const DBXCLIENT_ID = process.env.DBX_CLIENT_ID;
const CLIENT_SECRET = process.env.DBX_CLIENT_SECRET;

const config = {
    clientId: DBXCLIENT_ID,
    clientSecret: CLIENT_SECRET,
};




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
      services_action_plan.goal1summary ,
      services_action_plan.goal2summary ,
      services_action_plan.goal3summary,
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
      services_action_plan.goal1summary ,
      services_action_plan.goal2summary ,
      services_action_plan.goal3summary,
      services_action_plan.goal1completiondate  ,
      services_action_plan.goal2completiondate ,
      services_action_plan.goal3completiondate,
      services_action_plan.planstartdate,
      progress_note.id as progress_note_id,
      progress_note.progressnotedate as progressnotedate,
      progress_note.developmentactionplan as progressnote_developmentactionplan,
      progress_note.cd4vllabreport as cd4vllabreport,
      progress_note.transportationcoordination as transportationcoordination,
      progress_note.translationinterpretation as translationinterpretation,
      progress_note.comprehensivebehavioralriskassessment as comprehensivebehavioralriskassessment,
      progress_note.ticklerupdate as ticklerupdate,
      progress_note.treatmenteducation as treatmenteducation,
      progress_note.preventioncounselling as preventioncounselling,
      progress_note.supportivecounselling as supportivecounselling,
      progress_note.escort as escort,
      progress_note.caseclosuredischarge as caseclosuredischarge,
      progress_note.linkagetoservices as linkagetoservices,
      progress_note.supportgroups as supportgroups,
      progress_note.otherassistance as otherassistance, 
      progress_note.implementationactionplan as implementationactionplan,
      progress_note.housingassistance as housingassistance,
      progress_note.benefitsassistance as benefitsassistance,
      progress_note.employmentassistance as employmentassistance 
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
      console.log("response",response)
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
        newClient.goal1summary =client.goal1summary?1:0 
      newClient.goal2summary =client.goal2summary ?1:0
      newClient.goal3summary=client.goal3summary?1:0
        if(client.progress_note_id ===null || client.progress_note_id ===''){
          
          progressnotes=[]
        } else {
          pn={id:client.progress_note_id,date:client.progressnotedate,
            developmentactionplan:client.progressnote_developmentactionplan,
            cd4vllabreport:client.cd4vllabreport,
            transportationcoordination:client.transportationcoordination,
            translationinterpretation:client.translationinterpretation,
            comprehensivebehavioralriskassessment:client.comprehensivebehavioralriskassessment,
            ticklerupdate:client.ticklerupdate,
            treatmenteducation:client.treatmenteducation,
            preventioncounselling:client.preventioncounselling,
            supportivecounselling:client.supportivecounselling,
            escort:client.escort,
            caseclosuredischarge:client.caseclosuredischarge,
            linkagetoservices:client.linkagetoservices,
            supportgroups:client.supportgroups,
            otherassistance:client.otherassistance,
            implementationactionplan:client.implementationactionplan,
            housingassistance:client.housingassistance,
            benefitsassistance:client.benefitsassistance,
            employmentassistance:client.employmentassistance
          
          }
          progressnotes.push(pn)
        }
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
    console.log("create client",req.body)
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
   async function checkSSN(clientID) {
      const query1 = {
        text: "select * from clients where clientid=$1",
        values: [clientID]
      };
      try {
        const data = await db.query(query1)
        
        if (data.rows.length > 0) {
          res.status(400).send("Client is already registered");
        } else {
          const query = {
            text: "INSERT INTO clients(clientfirstname,clientlastname,clientssn,clientactive,clienthcwid,clienthcwname,clienthcwlastname,clientid,clientdatecreated,clienthcwemail,clientcategory) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
            values: [
              nameCapitalized, lastnameCapitalized, clientSSN, clientActive, clientHCWID, clientHCWName, clientHCWLastname, clientID, clientDateCreated,clientHCWemail,clientCategory
            ],
          };
        
          const response = await db.query(query)
          //const res = await res.status(200).json(data.rows[0])
          const newresponse = await dropbox.connectToDropbox(DBXCLIENT_ID,clientID)
          const createFolders = await dropbox.createAllFolders(clientID)
          const action_plans = await dropbox.shareFolder(clientID,folders[0])
          const cbra = await dropbox.shareFolder(clientID,folders[1])
          const consent = await dropbox.shareFolder(clientID,folders[2])
          const idg = await dropbox.shareFolder(clientID,folders[3])
          const intake = await dropbox.shareFolder(clientID,folders[4])
          const linkage_navigation = await dropbox.shareFolder(clientID,folders[5])
          const medical = await dropbox.shareFolder(clientID,folders[6])
          const miscellaneous = await dropbox.shareFolder(clientID,folders[7])
          const support_groups = await dropbox.shareFolder(clientID,folders[8])
          const tickler_updates = await dropbox.shareFolder(clientID,folders[9])
          const responsestatus= await res.status(200).send({statusText:'OK', message:"client created"})
        }
      } catch (e){
        res.status(400).send({message:"an error occurred while registering a new client",response:e})
      }
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



