const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

module.exports = {
  getMsaForms: async (req, res) => {
    const query= {
      text:'select * from msa_form'
    }
    try {
      const allData = await db.query(query);
      const response = allData.rows;
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  },
  getClientMsaForm: async (req, res) => {
    let { clientid } = await req.params;
    console.log("clientid",clientid)
    const query = {
      text: "select * from msa_form where clientid=$1",
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log(e);
    }
  },
  createMsaForm: async (req, res) => {
   

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
    let {
      dateFormReviewed,
      clientId,
      clientFirstName,
      clientLastName,
      clientHCWID,
      userFirstName,
      userLastName,
      AIRSIntakeForm,
      AIRSIntakeFormDate,
      ComprehensiveRiskBehaviorAssessment,
      ComprehensiveRiskBehaviorAssessmentDate,
      ServiceActionPlan,
      ServiceActionPlanDate,
      AIRSCollateralInformation,
      AIRSCollateralInformationDate,
      AIRSFinancialInformation,
      AIRSFinancialInformationDate,
      AIRSHIVAIDSRiskHistory,
      AIRSHIVAIDSRiskHistoryDate,
      AIRSHCVHistory,
      AIRSHCVHistoryDate,
      AIRSHousingInformation,
      AIRSHousingInformationDate,
      AIRSInsuranceInformation,
      AIRSInsuranceInformationDate,
      AIRSSubstanceUseHistory,
      AIRSSubstanceUseHistoryDate,
      LNEClientRights,
      LNEClientRightsDate,
      LNEClientGrievancePolicyProcedure,
      LNEClientGrievancePolicyProcedureDate,
      LNEProgramRules,
      LNEProgramRulesDate,
      LNEEmergencyContactConsent,
      LNEEmergencyContactConsentDate,
      LNEConsentForReleaseOfConfidentialInformation,
      LNEConsentForReleaseOfConfidentialInformationDate,
      HIPPAConsentForm,
      HIPPAConsentFormDate,
      NYCDOHMHNoticeOfPrivacyPractices,
      NYCDOHMHNoticeOfPrivacyPracticesDate,
      LNEOutreachRetentionTrackingForm,
      LNEOutreachRetentionTrackingFormDate,
      LNEReferralInformation,
      LNEReferralInformationDate,
      LNEClientReferralForm,
      LNEClientReferralFormDate,
      LNEHNSEligibilityForm,
      LNEHNSEligibilityFormDate,
    } = req.body.clientData;



    try {

      
      const query = {
        text:`insert into msa_form (
          dateFormReviewed,
          clientId,
          clientFirstName,
          clientLastName,
          clientHCWID,
          userFirstName,
          userLastName,
          AIRSIntakeForm,
          AIRSIntakeFormDate,
          ComprehensiveRiskBehaviorAssessment,
          ComprehensiveRiskBehaviorAssessmentDate,
          ServiceActionPlan,
          ServiceActionPlanDate,
          AIRSCollateralInformation,
          AIRSCollateralInformationDate,
          AIRSFinancialInformation,
          AIRSFinancialInformationDate,
          AIRSHIVAIDSRiskHistory,
          AIRSHIVAIDSRiskHistoryDate,
          AIRSHCVHistory,
          AIRSHCVHistoryDate,
          AIRSHousingInformation,
          AIRSHousingInformationDate,
          AIRSInsuranceInformation,
          AIRSInsuranceInformationDate,
          AIRSSubstanceUseHistory,
          AIRSSubstanceUseHistoryDate,
          LNEClientRights,
          LNEClientRightsDate,
          LNEClientGrievancePolicyProcedure,
          LNEClientGrievancePolicyProcedureDate,
          LNEProgramRules,
          LNEProgramRulesDate,
          LNEEmergencyContactConsent,
          LNEEmergencyContactConsentDate,
          LNEConsentForReleaseOfConfidentialInformation,
          LNEConsentForReleaseOfConfidentialInformationDate,
          HIPPAConsentForm,
          HIPPAConsentFormDate,
          NYCDOHMHNoticeOfPrivacyPractices,
          NYCDOHMHNoticeOfPrivacyPracticesDate,
          LNEOutreachRetentionTrackingForm,
          LNEOutreachRetentionTrackingFormDate,
          LNEReferralInformation,
          LNEReferralInformationDate,
          LNEClientReferralForm,
          LNEClientReferralFormDate,
          LNEHNSEligibilityForm,
          LNEHNSEligibilityFormDate) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49) RETURNING *`,
          values:[
            dateFormReviewed,
            clientId,
            clientFirstName,
            clientLastName,
            clientHCWID,
            userFirstName,
            userLastName,
            AIRSIntakeForm,
            AIRSIntakeFormDate,
            ComprehensiveRiskBehaviorAssessment,
            ComprehensiveRiskBehaviorAssessmentDate,
            ServiceActionPlan,
            ServiceActionPlanDate,
            AIRSCollateralInformation,
            AIRSCollateralInformationDate,
            AIRSFinancialInformation,
            AIRSFinancialInformationDate,
            AIRSHIVAIDSRiskHistory,
            AIRSHIVAIDSRiskHistoryDate,
            AIRSHCVHistory,
            AIRSHCVHistoryDate,
            AIRSHousingInformation,
            AIRSHousingInformationDate,
            AIRSInsuranceInformation,
            AIRSInsuranceInformationDate,
            AIRSSubstanceUseHistory,
            AIRSSubstanceUseHistoryDate,
            LNEClientRights,
            LNEClientRightsDate,
            LNEClientGrievancePolicyProcedure,
            LNEClientGrievancePolicyProcedureDate,
            LNEProgramRules,
            LNEProgramRulesDate,
            LNEEmergencyContactConsent,
            LNEEmergencyContactConsentDate,
            LNEConsentForReleaseOfConfidentialInformation,
            LNEConsentForReleaseOfConfidentialInformationDate,
            HIPPAConsentForm,
            HIPPAConsentFormDate,
            NYCDOHMHNoticeOfPrivacyPractices,
            NYCDOHMHNoticeOfPrivacyPracticesDate,
            LNEOutreachRetentionTrackingForm,
            LNEOutreachRetentionTrackingFormDate,
            LNEReferralInformation,
            LNEReferralInformationDate,
            LNEClientReferralForm,
            LNEClientReferralFormDate,
            LNEHNSEligibilityForm,
            LNEHNSEligibilityFormDate]

      }

            let response_id=''
            let response_clientId=''

            const updateClientProfileWithMSAForm=()=>{
              console.log(response_id,response_clientId)
              if(response_id !=="" && response_clientId !==""){

                const queryToUpdateClientPrfileWithMSAForm = {
                  text: `UPDATE clients SET msa_form_id = $1 WHERE clientid =$2`,
                  values:[response_id,response_clientId]
                }
  
                db.query(queryToUpdateClientPrfileWithMSAForm)
                .then((data) => {
                  console.log("sucess")
                })
                
                .catch((e) => console.error(e.stack));
              }
            }

      db.query(query)
      .then(data=>{
        response_id=data.rows[0].id
        response_clientId=data.rows[0].clientid
        res.status(200).send(req.body)
      })
      .then(rex=>updateClientProfileWithMSAForm())
      .catch(err=>console.log(err))
      
    } catch (error) {
      res.status(400).json({
        "message":"an error ocurred"
      })
    }
  },
  updateMsaForm: async (req, res) => {
    res.send("updating");
  },
};
