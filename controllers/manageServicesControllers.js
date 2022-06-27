const db = require('../dbConnect')

module.exports = {
    manageServicesMetric : async (req,res)=>{
        try {
            const allData = await db.query(`
            with lne as (
                select clients.id,clients.clientfirstname,clients.clientlastname,services_action_plan.planstartdate as planstartdate, 
                services_action_plan.goal1completed,services_action_plan.goal2completed,services_action_plan.goal3completed,
                services_action_plan.goal1completiondate,services_action_plan.goal2completiondate,services_action_plan.goal3completiondate,
                services_action_plan.goal1targetdate,services_action_plan.goal2targetdate,services_action_plan.goal3targetdate,
                progress_note.id as progressnote_id, progress_note.progressnotedate,
                ROW_NUMBER() OVER (PARTITION BY clients.id
                    ORDER BY progress_note.id desc) row_num
                from clients
                full outer join services_action_plan on services_action_plan.clientid = clients.clientid 
                full outer join progress_note on progress_note.clientid  = clients.clientid 
                WHERE clients.clientactive ='1' and services_action_plan.planstartdate is not null 
                ) 
                select * from lne where row_num=1`)
            const response = allData.rows 
              res.send(response)
            }
            catch (e) {
              console.log(e)
              res.send("an error ocurred")
            }
    },
    
}