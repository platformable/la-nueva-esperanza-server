const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
   
    createNewIssue: async (req,res)=> {

       
        try {
            for (const property in req.body.issueFounded) {
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
                hcw,
                datelastupdated,
                description,
                msaform
            } = req.body.issueFounded
    

            const query ={
                text:`
                insert into issues(
                clientId,
                hcw,
                datelastupdated,
                description,
                msaform
                ) VALUES($1,$2,$3,$4,$5) RETURNING *`,
                values:[
                    clientId,
                    hcw,
                    datelastupdated,
                    description,
                    msaform
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"issue saved successfully"})})
        } catch(e){
            res.send(e)
        }
        

    }
}