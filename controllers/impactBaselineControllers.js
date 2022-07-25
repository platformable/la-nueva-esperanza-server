const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
   
    createNewImpactBaseline: async (req,res)=> {

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
        let {clientId,
            serviceActionPlanId,
            impactFormStartDate ,
barrierHIVPrimaryCare ,
barrierAccessingMedications,
medicationAdherence,
CD4ViralLoad ,
lastHIVTest,
PrEP,
unsafeSexualBehavior ,
substanceAbuse ,
riskOfOverdose ,
mentalHealthIssues ,
unstableHousing ,
foodInsecurity ,
legalIssues ,
unstableEmployment,
        } = req.body.clientData

        const query ={
            text:`
            insert into impact_baseline(
                clientId,
                serviceActionPlanId,
                impactFormStartDate ,
                barrierHIVPrimaryCare ,
                barrierAccessingMedications ,
                medicationAdherence,
                CD4ViralLoad ,
                lastHIVTest,
                PrEP,
                unsafeSexualBehavior ,
                substanceAbuse ,
                riskOfOverdose ,
                mentalHealthIssues ,
                unstableHousing ,
                foodInsecurity ,
                legalIssues ,
                unstableEmployment ,
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
            values:[
                clientId,
                serviceActionPlanId,
                impactFormStartDate ,
                barrierHIVPrimaryCare ,
                barrierAccessingMedications ,
                medicationAdherence,
                CD4ViralLoad ,
                lastHIVTest,
                PrEP,
                unsafeSexualBehavior ,
                substanceAbuse ,
                riskOfOverdose ,
                mentalHealthIssues ,
                unstableHousing ,
                foodInsecurity ,
                legalIssues ,
                unstableEmployment,
            ]
        }
        try {
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"impact_baseline saved successfully"})})
        } catch(e){
            res.send(e)
        }
        

    }
}