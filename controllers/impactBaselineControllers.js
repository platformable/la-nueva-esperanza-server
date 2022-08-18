const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
   
    createNewImpactBaseline: async (req,res)=> {
console.log(req.body.impactBaseline)

       
        try {
            for (const property in req.body.impactBaseline) {
                if(req.body.impactBaseline[property]==='true'){
                  req.body.impactBaseline[property]=1
                }
                if(req.body.impactBaseline[property]==='false'){
                  req.body.impactBaseline[property]=0
                }
                if(req.body.impactBaseline[property]===""){
                  req.body.impactBaseline[property]=null
                }
              } 
             let {
                clientId,
  serviceActionPlanId,
  impactFormStartDate,
  barrierHIVPrimaryCare,
  CD4ViralLoad,
  unsafeSexualBehavior,
  substanceAbuse,
  legalIssues,
  unstableEmployment,
  unstableHousing
            } = req.body.impactBaseline
    
    console.log(
        clientId,
        serviceActionPlanId,
        impactFormStartDate,
        barrierHIVPrimaryCare,
        CD4ViralLoad,
        unsafeSexualBehavior,
        substanceAbuse,
        legalIssues,
        unstableEmployment,
        unstableHousing
    )
            const query ={
                text:`
                insert into impact_baseline(
                clientId,
                serviceActionPlanId,
                impactFormStartDate,
                barrierHIVPrimaryCare,
                CD4ViralLoad,
                unsafeSexualBehavior,
                substanceAbuse,
                legalIssues,
                unstableEmployment,
                unstableHousing
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
                values:[
                clientId,
                serviceActionPlanId,
                impactFormStartDate,
                barrierHIVPrimaryCare,
                CD4ViralLoad,
                unsafeSexualBehavior,
                substanceAbuse,
                legalIssues,
                unstableEmployment,
                unstableHousing
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"impact_baseline saved successfully"})})
        } catch(e){
            res.send(e)
        }
        

    }
}