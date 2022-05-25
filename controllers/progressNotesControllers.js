const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
    getProgressNoteByClientId: async (req,res)=>{
        let { clientid } = await req.params;
      
        const query = {
          text: `
          select clients.clientid,
clients.clientfirstname,
clients.clientlastname, 
clients.clienthcwid,
clients.clienthcwname,
clients.clienthcwlastname, 
services_action_plan.goal1servicecategory,
services_action_plan.goal1summary,
services_action_plan.goal1targetdate,
services_action_plan.goal2servicecategory,
services_action_plan.goal2summary,
services_action_plan.goal2targetdate,
services_action_plan.goal3servicecategory,
services_action_plan.goal3summary,
services_action_plan.goal3targetdate,
msa_form.airscollateralinformation ,
msa_form.airsfinancialinformation,
msa_form.airshivaidsriskhistory ,
msa_form.airshcvhistory ,
msa_form.airshousinginformation,
msa_form.airsinsuranceinformation ,
msa_form.airssubstanceusehistory,
msa_form.lneclientrights ,
msa_form.lneclientgrievancepolicyprocedure,
msa_form.lneprogramrules,
msa_form.lneemergencycontactconsent ,
msa_form.lneconsentforreleaseofconfidentialinformation,
msa_form.hippaconsentform,
msa_form.nycdohmhnoticeofprivacypractices,
msa_form.lneoutreachretentiontrackingform,
msa_form.lnereferralinformation,
msa_form.lneclientreferralform ,
msa_form.lnehnseligibilityform 
from clients inner join services_action_plan on 
clients.clientid = services_action_plan.clientid inner join msa_form on msa_form.clientid = clients.clientid  where clients.clientid=$1`,
          values: [clientid],
        };
        try {
    
          const allData = await db.query(query);
          const response = allData.rows;
        /*   console.log("response", response); */
          console.log("response length", allData.rows[0]);
          res.send(response);
        } catch (e) {
          console.log("response");
        }
    }
}