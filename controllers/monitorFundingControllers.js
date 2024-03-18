const db = require("../dbConnect");

module.exports = {
  monitorFundingMetrics: async (req, res) => {
    try {
      const allData = await db.query(`
            select clients.*,services_action_plan.planstartdate, 
services_action_plan.id as sapid,services_action_plan.goal1completed,services_action_plan.goal2completed,services_action_plan.goal3completed, 
progress_note.id as progressnote_id, progress_note.progressnotedate 
from clients
full outer join services_action_plan on services_action_plan.clientid = clients.clientid 
full outer join progress_note on progress_note.clientid  = clients.clientid 
WHERE clients.clientactive ='1'
order by clients.id asc `);

      const data = await allData.rows;
      console.log("data", data);
      const newClients = [];

      const checkIfUserIsOnTheFinalArray = (clientID) => {
        const result = newClients.findIndex((x) => x.id === clientID);
        result !== -1 ? "result" : "false";
        /* console.log(result) */
        return result;
      };

      const newData = data.forEach((client) => {
        const newClient = {};
        newClient.progressnotes = [];
        const clientID = client.clientid;
        let pn = {};

        const checkUser = checkIfUserIsOnTheFinalArray(clientID);
        if (checkUser !== -1) {
          pn = { id: client.progressnote_id, date: client.progressnotedate };
          newClients[checkUser].progressnotes.push(pn);
        } else {
          newClient.id = client.clientid;
          (newClient.clientfirstname = client.clientfirstname),
            (newClient.clientlastname = client.clientlastname);
          /*                 newClient.clientssn=client.clientssn */
          newClient.clientactive = client.clientactive;
          newClient.clienthcwid = client.clienthcwid;
          newClient.clientid = client.clientid;
          newClient.clienthcwname = client.clienthcwname;
          newClient.clienthcwlastname = client.clienthcwlastname;
          newClient.clientdatecreated = client.clientdatecreated;
          newClient.services_action_plan_id = client.services_action_plan_id;
          newClient.goal1completed =
            client.goal1completed === null ? 0 : client.goal1completed;
          newClient.goal2completed =
            client.goal2completed === null ? 0 : client.goal2completed;
          newClient.goal3completed =
            client.goal3completed === null ? 0 : client.goal3completed;
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
          newClient.clienthcwemail = client.clienthcwemail;
          newClient.planstartdate = client.planstartdate;
          newClient.sapid = client.sapid;
          newClient.progressnote_id = client.progressnote_id;
          client.progressnote_id
            ? newClient.progressnotes.push(
                (pn = {
                  id: client.progressnote_id,
                  date: client.progressnotedate,
                })
              )
            : "";
          newClients.push(newClient);
        }
      });
      res.json(newClients);
    } catch (e) {
      console.log(e);
      res.send("an error ocurred");
    }
  },
  monitorFundingSap: async (req, res) => {
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
      data.length===0 ? res.send([]) : res.send(data);
    } catch (e) {
      console.log(e);
      res.send("an error ocurred");
    }
  },
  monitorFundingProgressNotes: async (req, res) => {
    try {
     /*  const allData = await db.query(`SELECT DISTINCT clients.*, progress_note.id as progressnote_id, progress_note.progressnotedate 
      FROM clients
      JOIN (
        SELECT progress_note.*,
               ROW_NUMBER() OVER (PARTITION BY clientid ORDER BY progressnotedate DESC) AS row_num
        FROM progress_note
      ) AS progress_note
      ON progress_note.clientid = clients.clientid
      WHERE clients.clientactive = '1' 
      AND progress_note.row_num = 1
      ORDER BY clients.id ASC;`); */


/*       const allData = await db.query(`SELECT clients.id,
      clients.clientid,
      clients.clientfirstname,
      clients.clientlastname,
      clients.clientactive,
      clients.clientdatecreated, progress_note.id as progressnote_id, progress_note.progressnotedate
    FROM clients
    JOIN progress_note
    ON progress_note.clientid = clients.clientid
    WHERE clients.clientactive = '1'
    GROUP BY clients.id, progress_note.id, progress_note.progressnotedate; 
      
      `) */

      const allData = await db.query(`SELECT clients.id,
      clients.clientid,
      clients.clientfirstname,
      clients.clientlastname,
      clients.clientactive,
      clients.clientdatecreated,
      progress_note.id AS progressnote_id,
      progress_note.progressnotedate
FROM clients
JOIN (
   SELECT *,
          ROW_NUMBER() OVER (PARTITION BY clientid ORDER BY progressnotedate DESC) AS rn
   FROM progress_note
) AS progress_note
ON progress_note.clientid = clients.clientid
WHERE progress_note.rn <= 2
AND clients.clientactive = '1';`)
      const data = await allData.rows;
      

      const uniqueClients = data.reduce((acc, current) => {
        const existingClient = acc.find(client => client.id === current.id);
        if (!existingClient) {
          acc.push({
            ...current,
            pn: [{pn:current.progressnote_id,progressnotedate:current.progressnotedate}],
          });
        } else {
          existingClient.pn.push({pn:current.progressnote_id,
            progressnotedate:current.progressnotedate
          });
        }
        return acc;
      }, []);
      data.length===0 ? res.send([]) : res.send(uniqueClients);
    } catch (e) {
      console.log(e);
      res.send("an error ocurred");
    }
  },
  monitorFundingClientsSaps: async (req, res) => {
    try {
      /* const allData = await db.query(`select clients.id,clients.clientid,clients.clientfirstname,clients.clientlastname,
      clients.clientactive,clients.clientdatecreated,
      sap.planstartdate,sap.id as sapid,sap.goal1completed,sap.goal2completed from clients
      join services_action_plan sap on sap.clientid = clients.clientid `); */

      const allData = await db.query(`
      SELECT clients.id,
       clients.clientid,
       clients.clientfirstname,
       clients.clientlastname,
       clients.clientactive,
       clients.clientdatecreated,
       sap.id AS sapid,
       sap.planstartdate,
       sap.goal1completed,sap.goal2completed 
FROM clients
JOIN (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY clientid ORDER BY planstartdate DESC) AS rn
    FROM services_action_plan sap 
) AS sap
ON sap.clientid = clients.clientid
WHERE sap.rn <= 2
AND clients.clientactive = '1';`)

      const data = await allData.rows;

      const uniqueClients = data.reduce((acc, current) => {
        const existingClient = acc.find(client => client.id === current.id);
        if (!existingClient) {
          acc.push({
            ...current,
            saps: [{sapid:current.sapid,planstartdate:current.planstartdate,
              goal1Completed:current.goal1completed,
              goal2Completed:current.goal2completed}],
          });
        } else {
          existingClient.saps.push({sapid:current.sapid,
            planstartdate:current.planstartdate,
            goal1Completed:current.goal1completed,
            goal2Completed:current.goal2completed
          });
        }
        return acc;
      }, []);
      

      data.length===0 ? res.send([]) : res.send(uniqueClients);
      
    } catch (e) {
      console.log(e);
      res.send("an error ocurred");
    }
  },
};
