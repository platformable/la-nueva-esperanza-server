const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
   
    createNewIssue: async (req,res)=> {
        console.log("req.body",req.body)

        try {
    
             let {
                clientId,
                hcw,
                lastdateupdated,
                description,
                msaform
            } = req.body.issueFounded
    

            const query ={
                text:`
                insert into issues(
                clientId,
                hcw,
                lastdateupdated,
                description,
                msaform
                ) VALUES($1,$2,$3,$4,$5) RETURNING *`,
                values:[
                    clientId,
                    hcw,
                    lastdateupdated,
                    description,
                    msaform
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"issue saved successfully"})}
                  )
                  .then(response=>console.log("sucess")) 
                
        } catch(e){
            res.send(e)
            console.log("error",e)
        }
        

    }
}