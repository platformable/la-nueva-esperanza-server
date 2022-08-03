const db = require('../dbConnect')
const axios = require('axios')
let nodemailer = require("nodemailer");



const sendMessageToHcw =(hcw,email,clientId,description)=>{
  let mailTrasporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.NODEMAILEREMAIL,
      pass:process.env.EMAILPASSWORD
    }
  })

  let details = {
    from:"accounts@platformable.com",
    //to: clientHCWEmail,
    to:[email,'alexei@platformable'],
    subject:"An issue has been found",
    text:`Hi ${hcw}, Supervisor has identified this issue: "${description}" for client ${clientId}`
  }

  mailTrasporter.sendMail(details,(err)=>{
    
    if(err){
      console.log(err)
    } else {
      console.log("email sent")
    }
  })
}

module.exports= {
   
    createNewIssue: async (req,res)=> {
        console.log("req.body",req.body)

        try {
    
             let {
                clientId,
                hcw,
                lastdateupdated,
                description,
                msaform,
                hcwemail
            } = req.body.issueFounded
    

            const query ={
                text:`
                insert into issues(
                clientId,
                hcw,
                lastdateupdated,
                description,
                msaform,
                hcwemail
                ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
                values:[
                    clientId,
                    hcw,
                    lastdateupdated,
                    description,
                    msaform,
                    hcwemail
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"issue saved successfully"})}
                  )
                  .then(response=>sendMessageToHcw(hcw,hcwemail,clientId,description)) 
                
        } catch(e){
            res.send(e)
            console.log("error",e)
        }
    }
}