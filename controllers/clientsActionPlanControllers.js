const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

module.exports= {
    createClientActionPlan: async (req,res)=> {
        console.log("req.body",req.body)
        let {
            clientId ,
            clientFirstName,
            clientLastName,
            planStartDate,
            userFirstName,
            userLastName,
            goalServiceCategory ,
            goal1Summary ,
            goal1Details ,
            goal1TargetDate ,
            goal1ActionStep1 ,
            goal1ActionStep2 ,
            goal1ActionStep3 ,
            goal2ServiceCategory ,
            goal2Summary ,
            goal2Details,
            goal2TargetDate ,
            goal2ActionStep1 ,
            goal2ActionStep2 ,
            goal2ActionStep3 ,
            goal3ServiceCategory ,
            goal3Summary ,
            goal3Details ,
            goal3TargetDate ,
            goal3ActionStep1 ,
            goal3ActionStep2 ,
            goal3ActionStep3 ,
            comments,
            clientSignature,
            clientSignatureDate,
            HCWSignature,
            HCWSignatureDate,
            supervisorSignature,
          } = req.body;
    
        try {
            console.log(req.body)
            res.status(200).send({status:'OK',message:'Action Plan created successfully'})
        } catch (error) {
            console.log(error)
        }
    }
}