const db = require('../dbConnect')


module.exports= {
   
    createNew: async (req,res)=> {
        console.log("req.body",req.body)

        try {
    
             let {
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupHighlights ,
                supportGroupChallenges 
            } = req.body
    

            const query ={
                text:`
                insert into support_groups(
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupHighlights ,
                supportGroupChallenges
                ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
                values:[
                supportMeetingDate ,
                supportGroupName ,
                supportGroupAudience ,
                supportGroupTopic ,
                supportGroupHighlights ,
                supportGroupChallenges
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"supportGroups saved successfully",status:'OK'})}
                  )
                
        } catch(e){
            res.status(400).send({message:"FAIL"})
            console.log("error",e)
        }
    }
}