const db = require('../dbConnect')

module.exports = {
    monitorFundingMetrics : async (req,res)=>{
        try {
            const allData = await db.query(`
            select clients.*,services_action_plan.planstartdate, 
services_action_plan.id as sapid,services_action_plan.goal1completed,services_action_plan.goal2completed,services_action_plan.goal3completed, 
progress_note.id as progressnote_id, progress_note.progressnotedate 
from clients
full outer join services_action_plan on services_action_plan.clientid = clients.clientid 
full outer join progress_note on progress_note.clientid  = clients.clientid 
WHERE clients.clientactive ='1'
order by clients.id asc `)

            const data = await allData.rows 
            console.log("data",data)
            const newClients=[]


            const checkIfUserIsOnTheFinalArray=(clientID)=>{
              const result = newClients.findIndex(x=>x.id===clientID)
             result !== -1 ?  "result" :  "false";
             /* console.log(result) */
             return result
             
            }
            
            const newData=data.forEach(client=>{
                const newClient={}
                newClient.progressnotes=[]
                const clientID=client.clientid
                let pn={}
                
               const checkUser = checkIfUserIsOnTheFinalArray(clientID)
               if(checkUser !==-1){
                    pn={id:client.progressnote_id,date:client.progressnotedate}
                   newClients[checkUser].progressnotes.push(pn)
               } else {
                newClient.id=client.clientid
                newClient.clientfirstname=client.clientfirstname,
                newClient.clientlastname=client.clientlastname
/*                 newClient.clientssn=client.clientssn */
                newClient.clientactive=client.clientactive
                newClient.clienthcwid=client.clienthcwid
                newClient.clientid=client.clientid
                newClient.clienthcwname=client.clienthcwname
                newClient.clienthcwlastname=client.clienthcwlastname
                newClient.clientdatecreated=client.clientdatecreated
                newClient.services_action_plan_id=client.services_action_plan_id
                newClient.goal1completed=client.goal1completed === null ? 0:client.goal1completed
                newClient.goal2completed=client.goal2completed === null ? 0:client.goal2completed
                newClient.goal3completed=client.goal3completed === null ? 0:client.goal3completed
  /*               newClient.msa_form_id=client.msa_form_id
                newClient.cbra_folder_url=client.cbra_folder_url
                newClient.intake_folder_url=client.intake_folder_url
                newClient.miscellaneous_folder_url=client.miscellaneous_folder_url
                newClient.action_plans_folder_url=client.action_plans_folder_url
                newClient.medical_folder_url=client.medical_folder_url
                newClient.consent_folder_url=client.consent_folder_url
                newClient.linkage_navigation_folder_url=client.linkage_navigation_folder_url
                newClient.support_groups_folder_url=client.support_groups_folder_url
                newClient.tickler_updates_folder_url=client.tickler_updates_folder_url
                newClient.idg_folder_url=client.idg_folder_url */
                newClient.clienthcwemail=client.clienthcwemail
                newClient.planstartdate=client.planstartdate
                newClient.sapid=client.sapid
                newClient.progressnote_id=client.progressnote_id
               client.progressnote_id ? newClient.progressnotes.push(pn={id:client.progressnote_id,date:client.progressnotedate}):""
                newClients.push(newClient)
               }
         
               
            })
            res.json(newClients);

            }
            catch (e) {
              console.log(e)
              res.send("an error ocurred")
            }
    },
}