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
    servicesSap: async (req, res) => {
      console.log("fetching saps")
      try {
        const allData = await db.query(`SELECT DISTINCT clients.*,
        services_action_plan.planstartdate,
        services_action_plan.id AS sapid,
        services_action_plan.goal1completed,
        services_action_plan.goal2completed,
        services_action_plan.goal3completed
  FROM clients
  JOIN (
   SELECT services_action_plan.*,
          ROW_NUMBER() OVER (PARTITION BY clientid ORDER BY planstartdate DESC) AS row_num
   FROM services_action_plan
  ) AS services_action_plan
  ON services_action_plan.clientid = clients.clientid
  WHERE clients.clientactive = '1'
  AND services_action_plan.row_num = 1
  ORDER BY clients.id ASC;`);
  
        const data = await allData.rows;
        res.send(data);
      } catch (e) {
        console.log(e);
        res.send("an error ocurred");
      }
    },
    servicesProgressNotes: async (req, res) => {
      try {
        const allData = await db.query(`SELECT DISTINCT clients.*,
        services_action_plan.planstartdate,
        services_action_plan.id AS sapid,
        services_action_plan.goal1completed,
        services_action_plan.goal2completed,
        services_action_plan.goal3completed
  FROM clients
  JOIN (
   SELECT services_action_plan.*,
          ROW_NUMBER() OVER (PARTITION BY clientid ORDER BY planstartdate DESC) AS row_num
   FROM services_action_plan
  ) AS services_action_plan
  ON services_action_plan.clientid = clients.clientid
  WHERE clients.clientactive = '1'
  AND services_action_plan.row_num = 1
  ORDER BY clients.id ASC;`);
  
        const data = await allData.rows;
        res.send(data);
      } catch (e) {
        console.log(e);
        res.send("an error ocurred");
      }
    },
    
}