const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
  getImpactTrackerByClientId: async (req, res) => {
    let { id } = await req.params;
    console.log(req.params);

    const query = {
      text: `select * from impact_tracker where clientid=$1`,
      values: [id],
    };

    try {
      const allData = await db.query(query);
      const response = allData.rows;

      console.log("response",response)

      res.send(response);
    } catch (e) {
      console.log(e);
    }
  },
    createNewImpactTracker: async (req,res)=> {
       
        try {
            /* for (const property in req.body.impactTracker) {
                if(req.body.impactTracker[property]==='true'){
                  req.body.impactTracker[property]=1
                }
                if(req.body.impactTracker[property]==='false'){
                  req.body.impactTracker[property]=0
                }
                if(req.body.impactTracker[property]===""){
                  req.body.impactTracker[property]=null
                }
              }  */
             let {
                clientId,
                progress_note_id,
                impactFormStartDate,
                barrierHIVPrimaryCare,
                CD4Count,
                viralLoadCount,
                unsafeSexualBehavior,
                substanceAbuse ,
                unstableHousing ,
                legalIssues ,
                unstableEmployment,
                clientUniqueId
            } = req.body.impactTracker
    
            const query ={
                text:`
                insert into impact_tracker(
                clientId,
                progressnoteid,
                impactFormStartDate,
                barrierHIVPrimaryCare,
                CD4Count,
                ViralLoadCount,
                unsafeSexualBehavior,
                substanceAbuse ,
                unstableHousing ,
                legalIssues ,
                unstableEmployment,
                clientUniqueId 
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
                values:[
                    clientId,
                    progress_note_id,
                    impactFormStartDate,
                    barrierHIVPrimaryCare,
                    CD4Count,
                    viralLoadCount,
                    unsafeSexualBehavior,
                    substanceAbuse ,
                    unstableHousing ,
                    legalIssues ,
                    unstableEmployment,
                    clientUniqueId
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"impact_tracker saved successfully"})})
                  console.log("impact_tracker saved successfully")
        } catch(e){
            res.send(e)
        }
        

    },
    updateImpactTracker: async (req, res) => {
      let { 
        id,
        barrierhivprimarycare,
        cd4count,
        viralloadcount,
        unsafesexualbehavior,
        substanceabuse ,
        unstablehousing ,
        legalissues ,
        unstableemployment,
        clientuniqueid} = req.body;
  
      try {
        const query = await {
          name: "update-user",
          text: `update impact_tracker set 
          barrierhivprimarycare=$1,
          cd4count=$2,
          viralloadcount=$3,
          unsafesexualbehavior=$4,
          substanceabuse =$5,
          unstablehousing =$6,
          legalissues =$7,
          unstableemployment=$8 where clientuniqueid=$9`,
          values: [
            barrierhivprimarycare,
        cd4count,
        viralloadcount,
        unsafesexualbehavior,
        substanceabuse ,
        unstablehousing ,
        legalissues ,
        unstableemployment,clientuniqueid],
        };
        db
          .query(query)
          .then((response) =>
            res.send({
              data: response.rowCount,
              status: 200,
              statusText:'OK'
            })
          )
      } catch (error) {
        res.send({message:"an error ocurred", error:error});
        console.log("error message:", error);
      }
    },
}