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

      res.send(response);
    } catch (e) {
      console.log(e);
    }
  },
    createNewImpactTracker: async (req,res)=> {
console.log(req.body.impactTracker)

       
        try {
            for (const property in req.body.impactTracker) {
                if(req.body.impactTracker[property]==='true'){
                  req.body.impactTracker[property]=1
                }
                if(req.body.impactTracker[property]==='false'){
                  req.body.impactTracker[property]=0
                }
                if(req.body.impactTracker[property]===""){
                  req.body.impactTracker[property]=null
                }
              } 
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
                unstableEmployment
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
                unstableEmployment 
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
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
                    unstableEmployment ,
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"impact_tracker saved successfully"})})
                  console.log("impact_tracker saved successfully")
        } catch(e){
            res.send(e)
        }
        

    }
}