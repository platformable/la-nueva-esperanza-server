const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");


var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });



module.exports= {
  getClientServicesActionPlan: async (req,res)=>{
    let { clientid } = await req.params;
    const query= {
      text:'select * from services_action_plan sap where clientid =$1',
      values:[clientid]
    }
      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.json(response);
  },
  createServicesActionPlan: async (req,res)=> {

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
          } = req.body.clientData;


          if(HCWSignature=== "" || null || undefined){
            HCWSignature=0
          } else {
            HCWSignature=1
          }
          if(clientSignature=== "" || null || undefined){
            clientSignature=0
          }else {
            clientSignature=1
          }
          if(supervisorSignature==="" || null || undefined){
            supervisorSignature=0
          }else {
            supervisorSignature=1
          }
    
        try {
        
            const query = {
              text: `INSERT INTO services_action_plan (clientid, clientfirstname, clientlastname, planstartdate, userfirstname, userlastname, goal1servicecategory, goal1summary, goal1details, goal1targetdate, goal1actionstep1, goal1actionstep2, goal1actionstep3, goal2servicecategory, goal2summary, goal2details, goal2targetdate, goal2actionstep1, goal2actionstep2, goal2actionstep3, goal3servicecategory, goal3summary, goal3details, goal3targetdate, goal3actionstep1, goal3actionstep2, goal3actionstep3, comments, clientsignature, clientsignaturedate, hcwsignature,  supervisorsignature) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32) RETURNING *`,
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
                supervisorSignature
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
                  console.log("sucess")
                })
                
                .catch((e) => console.error(e.stack));
              }
            }

            db.query(query)
            .then((data) => {
              response_id=data.rows[0].id
              response_clientId=data.rows[0].clientid
              res.status(200).json(data.rows[0])
            })
            .then(res=>updateClientProfileWithSAP())
            .catch((e) => console.error(e.stack));
            

        

           

            
          
        } catch (error) {
            console.log(error)
        }
    }
}