const db = require('../dbConnect')


module.exports= {
    getAllSupportGroups:async(req,res)=>{
        try {
            const allData = await db.query("select * from support_groups");
            const response = allData.rows;
            res.send(response);
          } catch (e) {
            res.send("an error ocurred");
          }
    },
    getSupportGroupById:async (req,res)=>{
        let { id } = await req.params;
        console.log("sg id",id)
        const query = {
          text: "select * from support_groups where id=$1",
          values: [id],
        };
        try {
    const allData = await db.query(query);
            const response = allData.rows;
            res.send(response);
} catch (error) {
    res.status(400).send({message:"An error ocurred while trying to fetch specific support group by id"})
    
}
    },
   
    createNew: async (req,res)=> {
        console.log("support group req.body",req.body)

        try {
    
             let {
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupSummary,
                supportGroupChallenges,
                facilitator,
                supportGroupStartTime,
                supportGroupEndTime,
                supportGroupSigned 
            } = req.body
    

            const query ={
                text:`
                insert into support_groups(
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupSummary ,
                supportGroupChallenges,
                facilitator,
                supportGroupStartTime,
                supportGroupEndTime,
                supportGroupSigned 
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
                values:[
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupSummary,
                supportGroupChallenges,
                facilitator,
                supportGroupStartTime,
                supportGroupEndTime,
                supportGroupSigned 
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"supportGroups saved successfully",statusText:'OK'})}
                  )
                
        } catch(e){
            res.status(400).send({message:"FAIL"})
            console.log("error",e)
        }
    },
    updateSupportGroup: async (req, res) => {
        let {
            id,
            supportMeetingDate ,
            supportGroupName ,
            supportGroupAudience ,
            supportGroupTopic ,
            supportGroupSummary,
            supportGroupChallenges,
            facilitator,
            supportGroupStartTime,
            supportGroupEndTime,
            supportGroupSigned} = req.body;

            console.log("update sg req.body",req.body)
    
        try {
          const query = await {
            name: "update-support-groups",
            text: `update support_groups set 
            id=$1,
            supportMeetingDate=$2,
            supportGroupName=$3 ,
            supportGroupAudience=$4 ,
            supportGroupTopic=$5 ,
            supportGroupSummary=$6,
            supportGroupChallenges=$7,
            facilitator=$8,
            supportGroupStartTime=$9,
            supportGroupEndTime=$10,
            supportGroupSigned=$11 where id=$1`,
            values: [id,
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupSummary,
                supportGroupChallenges,
                facilitator,
                supportGroupStartTime,
                supportGroupEndTime,
                supportGroupSigned],
          };
          db
            .query(query)
            .then((response) => {
              console.log("response del success de up sg")
                res.send({
                data: response.rowCount,
                status: 200,
              })
                }
              )
        } catch (error) {
          res.json("an error ocurred");
          console.log("error message:", error);
        }
      },
      delete: async (req, res) => {
        const { id } = req.body;
        const query = {
          text: "DELETE from support_groups where id=$1",
          values: [id],
        };
        // promise
        db.query(query)
          .then((data) => {
       
              res.send({
                status: "OK",
                message: "support group deleted",
              });
         
          })
          .catch((e) => console.error(e.stack));
      },
}