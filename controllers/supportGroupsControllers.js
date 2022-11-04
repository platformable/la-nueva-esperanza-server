const db = require('../dbConnect')


module.exports= {
   
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
    }
}