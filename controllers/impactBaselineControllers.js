const db = require("../dbConnect");
const axios = require("axios");

module.exports = {
  getClientBaselineByClientId: async (req, res) => {
    let { id } = await req.params;
   

    const query = {
      text: `select * from impact_baseline where clientid=$1`,
      values: [id],
    };

    try {
      const allData = await db.query(query);
      const response = allData.rows;

      res.send(response);
    } catch (e) {
      console.log("error",e);
    }
  },
  createNewImpactBaseline: async (req, res) => {
    console.log("req.body.impactBaseline",req.body.impactBaseline);

    try {
      /*  for (const property in req.body.impactBaseline) {
                if(req.body.impactBaseline[property]==='true'){
                  req.body.impactBaseline[property]=1
                }
                if(req.body.impactBaseline[property]==='false'){
                  req.body.impactBaseline[property]=0
                }
                if(req.body.impactBaseline[property]===""){
                  req.body.impactBaseline[property]=null
                }
              }  */
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
        unstableHousing,
        CD4Count,
        viralLoadCount,
        clientUniqueId
      } = req.body.impactBaseline;

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
        unstableHousing,
        CD4Count,
        viralLoadCount,
        clientUniqueId
      );
      const query = {
        text: `
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
                unstableHousing,
                CD4Count,
                viralLoadCount,
                clientUniqueId
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        values: [
          clientId,
          serviceActionPlanId,
          impactFormStartDate,
          barrierHIVPrimaryCare,
          CD4ViralLoad,
          unsafeSexualBehavior,
          substanceAbuse,
          legalIssues,
          unstableEmployment,
          unstableHousing,
          CD4Count,
          viralLoadCount,
          clientUniqueId
        ],
      };
      db.query(query).then((data) => {
        console.log("impact baseline sucess")
        res.status(200).send({ message: "impact_baseline saved successfully",statusText:'OK' });
      });
    } catch (e) {
      res.send(e);
    }
  },
  updateClientBaselineByClientId: async (req, res) => {
    let { 
      id,
      barrierhivprimarycare,
      cd4viralload,
      unsafesexualbehavior,
      substanceabuse,
      legalissues,
      unstableemployment,
      unstablehousing,
      cd4count,
      viralloadcount,
      clientuniqueid} = req.body;

      console.log(req.body)

    try {
      const query = await {
        text: `update impact_baseline set 
        barrierHIVPrimaryCare=$1,
          CD4ViralLoad=$2,
          unsafeSexualBehavior=$3,
          substanceAbuse=$4,
          legalIssues=$5,
          unstableEmployment=$6,
          unstableHousing=$7,
          CD4Count=$8,
          viralLoadCount=$9,
          id=$10,clientuniqueid=$11 where clientuniqueid=$11`,
        values: [
          barrierhivprimarycare,
          cd4viralload,
          unsafesexualbehavior,
          substanceabuse,
          legalissues,
          unstableemployment,
          unstablehousing,
          cd4count,
          viralloadcount,id,clientuniqueid],
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
      res.send({message:"an error ocurre while trying to update impact baseline", error:error});
      console.log("an error ocurre while trying to update impact baseline:", error);
    }
  },
};
