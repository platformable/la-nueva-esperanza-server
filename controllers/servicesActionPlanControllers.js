const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");
let nodemailer = require("nodemailer");

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });



module.exports= {
  getClientsServicesActionPlan: async (req,res)=>{
db.query(`select * from services_action_plan`)
.then(response=>res.json(response.rows))
.catch(error=>console.log(error))
  },
  getClientServicesActionPlan: async (req,res)=>{
    console.log("get client sap")
    let { clientid } = await req.params;
    const query= {
      //text:'select * from services_action_plan where clientid =$1',
      text:`
      select clients.id ,clients.clientid as clientid,
clients.clientfirstname,
clients.clientlastname,
clients.clienthcwid,
clients.clienthcwname,
clients.clienthcwlastname,
clients.clientdatecreated,
clients.linkage_navigation_folder_url ,
clients.clienthcwemail,
	services_action_plan.clientFirstName,
    services_action_plan.clientLastName,
    services_action_plan.planStartDate,
    services_action_plan.userFirstName,
    services_action_plan.userLastName,
    services_action_plan.goal1ServiceCategory,
    services_action_plan.goal1Summary,
    services_action_plan.goal1Details,
    services_action_plan.goal1TargetDate,
    services_action_plan.goal1ActionStep1,
    services_action_plan.goal1ActionStep2,
    services_action_plan.goal1ActionStep3,
    services_action_plan.goal2ServiceCategory,
    services_action_plan.goal2Summary,
    services_action_plan.goal2Details,
    services_action_plan.goal2TargetDate,
    services_action_plan.goal2ActionStep1,
    services_action_plan.goal2ActionStep2,
    services_action_plan.goal2ActionStep3,
    services_action_plan.goal3ServiceCategory,
    services_action_plan.goal3Summary,
    services_action_plan.goal3Details,
    services_action_plan.goal3TargetDate,
    services_action_plan.goal3ActionStep1,
    services_action_plan.goal3ActionStep2,
    services_action_plan.goal3ActionStep3,
    services_action_plan.comments,
    services_action_plan.clientSignature,
    services_action_plan.clientSignatureDate,
    services_action_plan.HCWSignature,
    services_action_plan.HCWSignatureDate,
    services_action_plan.supervisorSignature,
	services_action_plan.goal1completed ,
	services_action_plan.goal2completed ,
	services_action_plan.goal3completed,
	services_action_plan.goal1completiondate  ,
	services_action_plan.goal2completiondate ,
	services_action_plan.goal3completiondate,
    progress_note.id as progressnoteid
	from clients 
	full outer join services_action_plan on clients.clientid = services_action_plan.clientid
	full outer join progress_note  on clients.clientid = progress_note.clientid
where clients.clientid =$1
      `,
      values:[clientid]
    }
      const allData = await db.query(query);
      const response = allData.rows;
      

console.log("response",response)
    
      const mergeObjects=()=>{
        let result={}
        result.progressnotesid=[]
        
      const createObject=  response.forEach(x=>{
    result.id=x.id
    result.clientId=x.clientid
    result.clientfirstname=x.clientfirstname
    result.clientlastname=x.clientlastname
    result.clienthcwid=x.clienthcwid
    result.clienthcwname=x.clienthcwname
    result.clienthcwlastname=x.clienthcwlastname
    result.clientdatecreated=x.clientdatecreated
    result.clienthcwemail=x.clienthcwemail
    result.linkage_navigation_folder_url=x.linkage_navigation_folder_url
    result.planstartdate=x.planstartdate
    result.userfirstname=x.userfirstname
    result.userlastname=x.userlastname
    result.goal1servicecategory=x.goal1servicecategory
    result.goal1summary=x.goal1summary
    result.goal1details=x.goal1details
    result.goal1targetdate=x.goal1targetdate
    result.goal1actionstep1=x.goal1actionstep1
    result.goal1actionstep2=x.goal1actionstep2
    result.goal1actionstep3=x.goal1actionstep3
    result.goal2servicecategory=x.goal2servicecategory
    result.goal2summary=x.goal2summary
    result.goal2details=x.goal2details
    result.goal2targetdate=x.goal2targetdate
    result.goal2actionstep1=x.goal2actionstep1
    result.goal2actionstep2=x.goal2actionstep2
    result.goal2actionstep3=x.goal2actionstep3
    result.goal3servicecategory=x.goal3servicecategory
    result.goal3summary=x.goal3summary
    result.goal3details=x.goal3details
    result.goal3targetdate=x.goal3targetdate
    result.goal3actionstep1=x.goal3actionstep1
    result.goal3actionstep2=x.goal3actionstep2
    result.goal3actionstep3=x.goal3actionstep3
    result.comments=x.comments
    result.clientsignature=x.clientsignature
    result.clientsignaturedate=x.clientsignaturedate
    result.hcwsignature=x.hcwsignature
    result.hcwsignaturedate=x.hcwsignaturedate
    result.supervisorsignature=x.supervisorsignature
    result.goal1completed=x.goal1completed
    result.goal2completed=x.goal2completed
    result.goal3completed=x.goal3completed
    result.goal1completiondate=x.goal1completiondate
    result.goal2completiondate=x.goal2completiondate
    result.goal3completiondate=x.goal3completiondate
    result.progressnotesid.push(x.progressnoteid)
      
        })
      res.send([result]);

      }
      mergeObjects()
  },
  getAllServicesActionPlansByClientId: async (req,res)=>{
    console.log("get all client saps")
    let { clientid } = await req.params;
    const query= {
      //text:'select * from services_action_plan where clientid =$1',
      text:`select clients.clientid ,clients.id,clients.clientfirstname,clients.clientlastname, 
      services_action_plan.id as sapid,services_action_plan.planstartdate,services_action_plan.status 
      from clients 
      inner join services_action_plan on clients.clientid = services_action_plan.clientid   
      where clients.clientid =$1
      `,
      values:[clientid]
    }
      const allData = await db.query(query);
      const response = allData.rows;

      if(response.length<=0){
        const allData = await db.query('select * from clients where clients.clientid=$1',[clientid]);
      const responseClientDataOnly = allData.rows;
        res.send({message:"There is no data for selected client",client:responseClientDataOnly})
      } else {
        const allData = await db.query('select * from clients where clients.clientid=$1',[clientid]);
        res.send({client:allData.rows,clientData:response})
      }
  },
  getAllServicesActionPlansByClientIdAndSapId: async (req,res)=>{
    console.log("get client sap by ids")
    let { clientid,sapid } = await req.params;
    console.log(req.params)
    const query= {

      text:`select clients.*,services_action_plan.* from clients 
      inner join services_action_plan on clients.clientid = services_action_plan.clientid 
      where clients.clientid=$1 and services_action_plan.id=$2
      `,
      values:[clientid,sapid]
    }
      const allData = await db.query(query);
      const response = allData.rows;

      if(response.length<=0){
        const allData = await db.query('select * from clients where clients.clientid=$1',[clientid]);
      const responseClientDataOnly = allData.rows;
        res.send({message:"There is no data for selected client",client:responseClientDataOnly})
      } else {
        // const allData = await db.query('select * from clients where clients.clientid=$1',[clientid]);
        res.send(response)
      }
  },
  createServicesActionPlan: async (req,res)=> {

    for (const property in req.body.clientData) {
      if(req.body.clientData[property]===true){
        req.body.clientData[property]=1
      }
      if(req.body.clientData[property]===false){
        req.body.clientData[property]=0
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
    } 

        let {
            clientId ,
            clientFirstName,
            clientLastName,
            planStartDate,
            userFirstName,
            userLastName,
            goal1ServiceCategory ,
            goal1Summary ,
            goal1Details ,
            goal1TargetDate ,
            goal1ActionStep1 ,
            goal1ActionStep2 ,
            goal1ActionStep3 ,
            goal2ServiceCategory ,
            goal2Summary ,
            goal2Details,
            goal2TargetDate ,
            goal2ActionStep1 ,
            goal2ActionStep2 ,
            goal2ActionStep3 ,
            goal3ServiceCategory ,
            goal3Summary ,
            goal3Details ,
            goal3TargetDate ,
            goal3ActionStep1 ,
            goal3ActionStep2 ,
            goal3ActionStep3 ,
            comments,
            clientSignature,
            clientSignatureDate,
            HCWSignature,
            HCWSignatureDate,
            supervisorSignature,
            clientUniqueId
          } = req.body.clientData;

          console.log(req.body.clientData)

        try {
        
            const query = {
              text: `INSERT INTO services_action_plan (clientid, clientfirstname, clientlastname, planstartdate, userfirstname, userlastname, goal1servicecategory, goal1summary, goal1details, goal1targetdate, goal1actionstep1, goal1actionstep2, goal1actionstep3, 
                goal2servicecategory, goal2summary, goal2details, goal2targetdate, goal2actionstep1, goal2actionstep2, goal2actionstep3, 
                goal3servicecategory, goal3summary, goal3details, goal3targetdate, goal3actionstep1, goal3actionstep2, goal3actionstep3, 
                comments, clientsignature, clientsignaturedate, hcwsignature,  supervisorsignature,clientUniqueId) 
              VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33) RETURNING *`,
              values: [
                clientId,
                clientFirstName,
                clientLastName,
                planStartDate,
                userFirstName,
                userLastName,
                goal1ServiceCategory,
                goal1Summary,
                goal1Details,
                goal1TargetDate,
                goal1ActionStep1,
                goal1ActionStep2,
                goal1ActionStep3,
                goal2ServiceCategory,
                goal2Summary,
                goal2Details,
                goal2TargetDate,
                goal2ActionStep1,
                goal2ActionStep2,
                goal2ActionStep3,
                goal3ServiceCategory,
                goal3Summary,
                goal3Details,
                goal3TargetDate,
                goal3ActionStep1,
                goal3ActionStep2,
                goal3ActionStep3,
                comments,
                clientSignature,
                clientSignatureDate,
                HCWSignature,
                supervisorSignature,
                clientUniqueId
              ],
            };

            let response_id=''
            let response_clientId=''

            const updateClientProfileWithSAP=()=>{
              console.log(response_id,response_clientId)
              if(response_id !=="" && response_clientId !==""){
                  console.log("corriendo")
                const queryToUpdateClientPrfileWithSAP = {
                  text: `UPDATE clients SET services_action_plan_id = $1 WHERE clientid =$2`,
                  values:[response_id,response_clientId]
                }
  
                db.query(queryToUpdateClientPrfileWithSAP)
                .then((data) => {
                  console.log("sucess update clients form after sap")
                })
                
                .catch((e) => console.error(e.stack));
              }
            }

            let activateCheckboxOnMSAForm=1

            const updateClientMSAForm=()=>{

                const queryToUpdateClientMSAForm = {
                  text: `UPDATE msa_form SET ServiceActionPlan = $1,ServiceActionPlanDate=$2 WHERE clientUniqueId =$3`,
                  values:[activateCheckboxOnMSAForm,new Date(),clientUniqueId]
                }
                db.query(queryToUpdateClientMSAForm)
                .then((data) => {
                  console.log("msa updated after sap")
                })    
                .catch((e) => console.error(e.stack));
             
            }

            db.query(query)
            .then((data) => {
              response_id=data.rows[0].id
              response_clientId=data.rows[0].clientid
              //res.status(200).json(data.rows[0])
              res.status(200).json({message:"service action plan saved successfully",service_action_plan_id:data.rows[0].id})
            })
            .then(res=>updateClientProfileWithSAP())
            .then(newResponse=>updateClientMSAForm())
            .catch((e) => console.error(e.stack));
            
        } catch (error) {
            console.log(error)
        }
    },
    updateClientServicesActionPlan: async (req,res)=>{
      
console.log(req.body)
      for (const property in req.body.clientData) {
        if(req.body.clientData[property]===true){
          req.body.clientData[property]=1
        }
        if(req.body.clientData[property]===false){
          req.body.clientData[property]=0
        }
        if(req.body.clientData[property]===""){
          req.body.clientData[property]=null
        }
      } 

      let {
        clientId,
        clientFirstName,
        clientLastName,
        planStartDate,
        userFirstName,
        userLastName,
        goal1ServiceCategory,
        goal1Summary,
        goal1Details,
        goal1TargetDate,
        goal1ActionStep1,
        goal1ActionStep2,
        goal1ActionStep3,
        goal2ServiceCategory,
        goal2Summary,
        goal2Details,
        goal2TargetDate,
        goal2ActionStep1,
        goal2ActionStep2,
        goal2ActionStep3,
        goal3ServiceCategory,
        goal3Summary,
        goal3Details,
        goal3TargetDate,
        goal3ActionStep1,
        goal3ActionStep2,
        goal3ActionStep3,
        comments,
        clientSignature,
        clientSignatureDate,
        HCWSignature,
        supervisorSignature,
        sapid
      } = req.body.clientData;

      try {
        
        const query = {
          text: `update services_action_plan set 
          clientid=$1,
          clientfirstname=$2, 
          clientlastname=$3, 
          planstartdate=$4, 
          userfirstname=$5, 
          userlastname=$6, 
          goal1servicecategory=$7, 
          goal1summary=$8, 
          goal1details=$9, 
          goal1targetdate=$10, 
          goal1actionstep1=$11, 
          goal1actionstep2=$12, 
          goal1actionstep3=$13, 
          goal2servicecategory=$14, 
          goal2summary=$15, 
          goal2details=$16, 
          goal2targetdate=$17, 
          goal2actionstep1=$18, 
          goal2actionstep2=$19, 
          goal2actionstep3=$20, 
          goal3servicecategory=$21, 
          goal3summary=$22, 
          goal3details=$23, 
          goal3targetdate=$24, 
          goal3actionstep1=$25, 
          goal3actionstep2=$26, 
          goal3actionstep3=$27, 
          comments=$28, 
          clientsignature=$29, 
          clientsignaturedate=$30, 
          hcwsignature=$31,  
          supervisorsignature=$32
          where id=$33`,
          values: [
            clientId,
            clientFirstName,
            clientLastName,
            planStartDate,
            userFirstName,
            userLastName,
            goal1ServiceCategory,
            goal1Summary,
            goal1Details,
            goal1TargetDate,
            goal1ActionStep1,
            goal1ActionStep2,
            goal1ActionStep3,
            goal2ServiceCategory,
            goal2Summary,
            goal2Details,
            goal2TargetDate,
            goal2ActionStep1,
            goal2ActionStep2,
            goal2ActionStep3,
            goal3ServiceCategory,
            goal3Summary,
            goal3Details,
            goal3TargetDate,
            goal3ActionStep1,
            goal3ActionStep2,
            goal3ActionStep3,
            comments,
            clientSignature,
            clientSignatureDate,
            HCWSignature,
            supervisorSignature,
            sapid
          ],
        };

        db.query(query)
        .then((data) => {
          console.log("sucess update sap")
          // sendMessageToHCW()
          res.status(200).json(data.rows[0])
        })

      
      
    } catch (error) {
        console.log("error del update",error)
    }


    },
    updateSAPFormFromProgressNote: async (req, res) => {
      console.log("req.body",req.body)
      
      for (const property in req.body.clientData) {
        if(req.body.clientData[property]===true){
          req.body.clientData[property]=1
        }
        if(req.body.clientData[property]===false){
          req.body.clientData[property]=0
        }
        if(req.body.clientData[property]===""){
          req.body.clientData[property]=null
        }
       
      } 
      let {
        clientId,
        goal1Completed,
        goal2Completed,
        goal3Completed,
        goal1CompletionDate,
        goal2CompletionDate,
        goal3CompletionDate,
        HCWSignature
      } = req.body.clientData;

      console.log(req.body)
  
      try {
        const query = await {
          name: "update-sap-from-progress-note",
          text: `update services_action_plan set 
          clientId=$1,
            goal1Completed=$2,
            goal2Completed=$3,
            goal3Completed=$4,
            goal1CompletionDate=$5,
            goal2CompletionDate=$6,
            goal3CompletionDate=$7,
            hcwsignature=$8 where clientId=$1`,
          values: [
            clientId,
            goal1Completed,
            goal2Completed,
            goal3Completed,
            goal1CompletionDate,
            goal2CompletionDate,
            goal3CompletionDate,
            HCWSignature
          ],
        };
        db
          .query(query)
          .then((response) =>{
            res.status(200).send(response)
          }
          )
          .then(response=>console.log("sap updated successfully"))
      } catch (error) {
        res.json("an error ocurred");
        console.log("error message:", error);
      }
    },
}