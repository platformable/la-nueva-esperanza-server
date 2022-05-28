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

    const query = {
      text: "select * from msa_form inner join clients on msa_form.clientid =clients.clientid where clients.clientid=$1",
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
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
      const query = await {
        name: "update-client-msa_form",
        text: `update msa_form set 
        dateFormReviewed = $1,
        clientId=$2,
        clientFirstName=$3,
        clientLastName=$4,
        clientHCWID=$5,
        userFirstName=$6,
        userLastName=$7,
        AIRSIntakeForm=$8,
        AIRSIntakeFormDate=$9,
        ComprehensiveRiskBehaviorAssessment=$10,
        ComprehensiveRiskBehaviorAssessmentDate=$11,
        ServiceActionPlan=$12,
        ServiceActionPlanDate=$13,
        AIRSCollateralInformation=$14,
        AIRSCollateralInformationDate=$15,
        AIRSFinancialInformation=$16,
        AIRSFinancialInformationDate=$17,
        AIRSHIVAIDSRiskHistory=$18,
        AIRSHIVAIDSRiskHistoryDate=$19,
        AIRSHCVHistory=$20,
        AIRSHCVHistoryDate=$21,
        AIRSHousingInformation=$22,
        AIRSHousingInformationDate=$23,
        AIRSInsuranceInformation=$24,
        AIRSInsuranceInformationDate=$25,
        AIRSSubstanceUseHistory=$26,
        AIRSSubstanceUseHistoryDate=$27,
        LNEClientRights=$28,
        LNEClientRightsDate=$29,
        LNEClientGrievancePolicyProcedure=$30,
        LNEClientGrievancePolicyProcedureDate=$31,
        LNEProgramRules=$32,
        LNEProgramRulesDate=$33,
        LNEEmergencyContactConsent=$34,
        LNEEmergencyContactConsentDate=$35,
        LNEConsentForReleaseOfConfidentialInformation=$36,
        LNEConsentForReleaseOfConfidentialInformationDate=$37,
        HIPPAConsentForm=$38,
        HIPPAConsentFormDate=$39,
        NYCDOHMHNoticeOfPrivacyPractices=$40,
        NYCDOHMHNoticeOfPrivacyPracticesDate=$41,
        LNEOutreachRetentionTrackingForm=$42,
        LNEOutreachRetentionTrackingFormDate=$43,
        LNEReferralInformation=$44,
        LNEReferralInformationDate=$45,
        LNEClientReferralForm=$46,
        LNEClientReferralFormDate=$47,
        LNEHNSEligibilityForm=$48,
        LNEHNSEligibilityFormDate=$49 where clientId=$2`,
        values: [dateFormReviewed,
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
          LNEHNSEligibilityFormDate],
      };
      db
        .query(query)
        .then((response) =>{
         console.log("updated response",response)
          res.status(200).send(response)
        }
        )
        .catch((e) => res.send(e.stack));
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },
  updateDESMsaForm: async (req, res) => {
 console.log("comenzando update")

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
//    planStartDate,
    userFirstName,
    userLastName,
    AIRSIntakeForm,
    AIRSIntakeFormDate,
    AIRSIntakeFormPDF,
    AIRSIntakeFormScan,
    AIRSIntakeFormUploadDate,
    ComprehensiveRiskBehaviorAssessment,
    ComprehensiveRiskBehaviorAssessmentDate,
    ComprehensiveRiskBehaviorAssessmentPDF,
    ComprehensiveRiskBehaviorAssessmentScan,
    ComprehensiveRiskBehaviorAssessmentUploadDate,
    ServiceActionPlan,
    ServiceActionPlanDate,
    ServiceActionPlanScan,
    ServiceActionPlanUploadDate,
    AIRSCollateralInformation,
    AIRSCollateralInformationDate,
    AIRSCollateralInformationPDF,
    AIRSCollateralInformationScan,
    AIRSCollateralInformationUploadDate,
    AIRSFinancialInformation,
    AIRSFinancialInformationDate,
    AIRSFinancialInformationPDF,
    AIRSFinancialInformationScan,
    AIRSFinancialInformationUploadDate,
    AIRSHIVAIDSRiskHistory,
    AIRSHIVAIDSRiskHistoryDate,
    AIRSHIVAIDSRiskHistoryPDF,
    AIRSHIVAIDSRiskHistoryScan,
    AIRSHIVAIDSRiskHistoryUploadDate,
    AIRSHCVHistory,
    AIRSHCVHistoryDate,
    AIRSHCVHistoryPDF,
    AIRSHCVHistoryScan,
    AIRSHCVHistoryUploadDate,
    AIRSHousingInformation,
    AIRSHousingInformationDate,
    AIRSHousingInformationPDF,
    AIRSHousingInformationScan,
    AIRSHousingInformationUploadDate,
    AIRSInsuranceInformation,
    AIRSInsuranceInformationDate,
    AIRSInsuranceInformationPDF,
    AIRSInsuranceInformationScan,
    AIRSInsuranceInformationUploadDate,
    AIRSSubstanceUseHistory,
    AIRSSubstanceUseHistoryDate,
    AIRSSubstanceUseHistoryPDF,
    AIRSSubstanceUseHistoryScan,
    AIRSSubstanceUseHistoryUploadDate,
    LNEClientRights,
    LNEClientRightsDate,
    LNEClientRightsPDF,
    LNEClientRightsScan,
    LNEClientRightsUploadDate,
    LNEClientGrievancePolicyProcedure,
    LNEClientGrievancePolicyProcedureDate,
    LNEClientGrievancePolicyProcedurePDF,
    LNEClientGrievancePolicyProcedureScan,
    LNEClientGrievancePolicyProcedureUploadDate,
    LNEProgramRules,
    LNEProgramRulesDate,
    LNEProgramRulesPDF,
    LNEProgramRulesScan,
    LNEProgramRulesUploadDate,
    LNEEmergencyContactConsent,
    LNEEmergencyContactConsentDate,
    LNEEmergencyContactConsentPDF,
    LNEEmergencyContactConsentScan,
    LNEEmergencyContactConsentUploadDate,
    LNEConsentForReleaseOfConfidentialInformation,
    LNEConsentForReleaseOfConfidentialInformationDate,
    LNEConsentForReleaseOfConfidentialInformationPDF,
    LNEConsentForReleaseOfConfidentialInformationScan,
    LNEConsentForReleaseOfConfidentialInformationUploadDate,
    HIPPAConsentForm,
    HIPPAConsentFormDate,
    HIPPAConsentFormPDF,
    HIPPAConsentFormScan,
    HIPPAConsentFormUploadDate,
    NYCDOHMHNoticeOfPrivacyPractices,
    NYCDOHMHNoticeOfPrivacyPracticesDate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF,
    NYCDOHMHNoticeOfPrivacyPracticesScan,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate,
    LNEOutreachRetentionTrackingForm,
    LNEOutreachRetentionTrackingFormDate,
    LNEOutreachRetentionTrackingFormPDF,
    LNEOutreachRetentionTrackingFormScan,
    LNEOutreachRetentionTrackingFormUploadDate,
    LNEReferralInformation,
    LNEReferralInformationDate,
    LNEReferralInformationPDF,
    LNEReferralInformationScan,
    LNEReferralInformationUploadDate,
    LNEClientReferralForm,
    LNEClientReferralFormDate,
    LNEClientReferralFormPDF,
    LNEClientReferralFormScan,
    LNEClientReferralFormUploadDate,
    LNEHNSEligibilityForm,
    LNEHNSEligibilityFormDate,
    LNEHNSEligibilityFormPDF,
    LNEHNSEligibilityFormScan,
    LNEHNSEligibilityFormUploadDate,
    } = req.body.clientData;

    try {
      const query = await {
        name: "update-client-ms_form_des",
        text: `update msa_form set 
         dateFormReviewed =$1,
    clientId =$2,
    clientFirstName =$3,
    clientLastName =$4,
    clientHCWID =$5,
    userFirstName=$6,
    userLastName=$7,
    AIRSIntakeForm=$8,
    AIRSIntakeFormDate =$9,
    AIRSIntakeFormPDF=$10,
    AIRSIntakeFormScan=$11,
    AIRSIntakeFormUploadDate=$12,
    ComprehensiveRiskBehaviorAssessment=$13,
    ComprehensiveRiskBehaviorAssessmentDate=$14,
    ComprehensiveRiskBehaviorAssessmentPDF=$15,
    ComprehensiveRiskBehaviorAssessmentScan=$16,
    ComprehensiveRiskBehaviorAssessmentUploadDate=$17,
    ServiceActionPlan=$18,
    ServiceActionPlanDate=$19,
    ServiceActionPlanScan=$20,
    ServiceActionPlanUploadDate=$21,
    AIRSCollateralInformation=$22,
    AIRSCollateralInformationDate=$23,
    AIRSCollateralInformationPDF=$24,
    AIRSCollateralInformationScan=$25,
    AIRSCollateralInformationUploadDate=$26,
    AIRSFinancialInformation=$27,
    AIRSFinancialInformationDate=$28,
    AIRSFinancialInformationPDF=$29,
    AIRSFinancialInformationScan=$30,
    AIRSFinancialInformationUploadDate=$31,
    AIRSHIVAIDSRiskHistory=$32,
    AIRSHIVAIDSRiskHistoryDate=$33,
    AIRSHIVAIDSRiskHistoryPDF=$34,
    AIRSHIVAIDSRiskHistoryScan=$35,
    AIRSHIVAIDSRiskHistoryUploadDate=$36,
    AIRSHCVHistory=$37,
    AIRSHCVHistoryDate=$38,
    AIRSHCVHistoryPDF=$39,
    AIRSHCVHistoryScan=$40,
    AIRSHCVHistoryUploadDate=$41,
    AIRSHousingInformation=$42,
    AIRSHousingInformationDate=$43,
    AIRSHousingInformationPDF=$44,
    AIRSHousingInformationScan=$45,
    AIRSHousingInformationUploadDate=$46,
    AIRSInsuranceInformation=$47,
    AIRSInsuranceInformationDate=$48,
    AIRSInsuranceInformationPDF=$49,
    AIRSInsuranceInformationScan=$50,
    AIRSInsuranceInformationUploadDate=$51,
    AIRSSubstanceUseHistory=$52,
    AIRSSubstanceUseHistoryDate=$53,
    AIRSSubstanceUseHistoryPDF=$54,
    AIRSSubstanceUseHistoryScan=$55,
    AIRSSubstanceUseHistoryUploadDate=$56,
    LNEClientRights=$57,
    LNEClientRightsDate=$58,
    LNEClientRightsPDF=$59,
    LNEClientRightsScan=$60,
    LNEClientRightsUploadDate=$61,
    LNEClientGrievancePolicyProcedure=$62,
    LNEClientGrievancePolicyProcedureDate=$63,
    LNEClientGrievancePolicyProcedurePDF=$64,
    LNEClientGrievancePolicyProcedureScan=$65,
    LNEClientGrievancePolicyProcedureUploadDate=$66,
    LNEProgramRules=$67,
    LNEProgramRulesDate=$68,
    LNEProgramRulesPDF=$69,
    LNEProgramRulesScan=$70,
    LNEProgramRulesUploadDate=$71,
    LNEEmergencyContactConsent=$72,
    LNEEmergencyContactConsentDate=$73,
    LNEEmergencyContactConsentPDF=$74,
    LNEEmergencyContactConsentScan=$75,
    LNEEmergencyContactConsentUploadDate=$76,
    LNEConsentForReleaseOfConfidentialInformation=$77,
    LNEConsentForReleaseOfConfidentialInformationDate=$78,
    LNEConsentForReleaseOfConfidentialInformationPDF=$79,
    LNEConsentForReleaseOfConfidentialInformationScan=$80,
    LNEConsentForReleaseOfConfidentialInformationUploadDate=$81,
    HIPPAConsentForm=$82,
    HIPPAConsentFormDate=$83,
    HIPPAConsentFormPDF=$84,
    HIPPAConsentFormScan=$85,
    HIPPAConsentFormUploadDate=$86,
    NYCDOHMHNoticeOfPrivacyPractices=$87,
    NYCDOHMHNoticeOfPrivacyPracticesDate=$88,
    NYCDOHMHNoticeOfPrivacyPracticesPDF=$89,
    NYCDOHMHNoticeOfPrivacyPracticesScan=$90,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate=$91,
    LNEOutreachRetentionTrackingForm=$92,
    LNEOutreachRetentionTrackingFormDate=$93,
    LNEOutreachRetentionTrackingFormPDF=$94,
    LNEOutreachRetentionTrackingFormScan=$95,
    LNEOutreachRetentionTrackingFormUploadDate=$96,
    LNEReferralInformation=$97,
    LNEReferralInformationDate=$98,
    LNEReferralInformationPDF=$99,
    LNEReferralInformationScan=$100,
    LNEReferralInformationUploadDate=$101,
    LNEClientReferralForm=$102,
    LNEClientReferralFormDate=$103,
    LNEClientReferralFormPDF=$104,
    LNEClientReferralFormScan=$105,
    LNEClientReferralFormUploadDate=$106,
    LNEHNSEligibilityForm=$107,
    LNEHNSEligibilityFormDate=$108,
    LNEHNSEligibilityFormPDF=$109,
    LNEHNSEligibilityFormScan=$110,
    LNEHNSEligibilityFormUploadDate=$111 where clientId=$2`,
        values: [ 
    dateFormReviewed,
    clientId,
    clientFirstName,
    clientLastName,
    clientHCWID,
    userFirstName,
    userLastName,
    AIRSIntakeForm,
    AIRSIntakeFormDate,
    AIRSIntakeFormPDF,
    AIRSIntakeFormScan,
    AIRSIntakeFormUploadDate,
    ComprehensiveRiskBehaviorAssessment,
    ComprehensiveRiskBehaviorAssessmentDate,
    ComprehensiveRiskBehaviorAssessmentPDF,
    ComprehensiveRiskBehaviorAssessmentScan,
    ComprehensiveRiskBehaviorAssessmentUploadDate,
    ServiceActionPlan,
    ServiceActionPlanDate,
    ServiceActionPlanScan,
    ServiceActionPlanUploadDate,
    AIRSCollateralInformation,
    AIRSCollateralInformationDate,
    AIRSCollateralInformationPDF,
    AIRSCollateralInformationScan,
    AIRSCollateralInformationUploadDate,
    AIRSFinancialInformation,
    AIRSFinancialInformationDate,
    AIRSFinancialInformationPDF,
    AIRSFinancialInformationScan,
    AIRSFinancialInformationUploadDate,
    AIRSHIVAIDSRiskHistory,
    AIRSHIVAIDSRiskHistoryDate,
    AIRSHIVAIDSRiskHistoryPDF,
    AIRSHIVAIDSRiskHistoryScan,
    AIRSHIVAIDSRiskHistoryUploadDate,
    AIRSHCVHistory,
    AIRSHCVHistoryDate,
    AIRSHCVHistoryPDF,
    AIRSHCVHistoryScan,
    AIRSHCVHistoryUploadDate,
    AIRSHousingInformation,
    AIRSHousingInformationDate,
    AIRSHousingInformationPDF,
    AIRSHousingInformationScan,
    AIRSHousingInformationUploadDate,
    AIRSInsuranceInformation,
    AIRSInsuranceInformationDate,
    AIRSInsuranceInformationPDF,
    AIRSInsuranceInformationScan,
    AIRSInsuranceInformationUploadDate,
    AIRSSubstanceUseHistory,
    AIRSSubstanceUseHistoryDate,
    AIRSSubstanceUseHistoryPDF,
    AIRSSubstanceUseHistoryScan,
    AIRSSubstanceUseHistoryUploadDate,
    LNEClientRights,
    LNEClientRightsDate,
    LNEClientRightsPDF,
    LNEClientRightsScan,
    LNEClientRightsUploadDate,
    LNEClientGrievancePolicyProcedure,
    LNEClientGrievancePolicyProcedureDate,
    LNEClientGrievancePolicyProcedurePDF,
    LNEClientGrievancePolicyProcedureScan,
    LNEClientGrievancePolicyProcedureUploadDate,
    LNEProgramRules,
    LNEProgramRulesDate,
    LNEProgramRulesPDF,
    LNEProgramRulesScan,
    LNEProgramRulesUploadDate,
    LNEEmergencyContactConsent,
    LNEEmergencyContactConsentDate,
    LNEEmergencyContactConsentPDF,
    LNEEmergencyContactConsentScan,
    LNEEmergencyContactConsentUploadDate,
    LNEConsentForReleaseOfConfidentialInformation,
    LNEConsentForReleaseOfConfidentialInformationDate,
    LNEConsentForReleaseOfConfidentialInformationPDF,
    LNEConsentForReleaseOfConfidentialInformationScan,
    LNEConsentForReleaseOfConfidentialInformationUploadDate,
    HIPPAConsentForm,
    HIPPAConsentFormDate,
    HIPPAConsentFormPDF,
    HIPPAConsentFormScan,
    HIPPAConsentFormUploadDate,
    NYCDOHMHNoticeOfPrivacyPractices,
    NYCDOHMHNoticeOfPrivacyPracticesDate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF,
    NYCDOHMHNoticeOfPrivacyPracticesScan,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate,
    LNEOutreachRetentionTrackingForm,
    LNEOutreachRetentionTrackingFormDate,
    LNEOutreachRetentionTrackingFormPDF,
    LNEOutreachRetentionTrackingFormScan,
    LNEOutreachRetentionTrackingFormUploadDate,
    LNEReferralInformation,
    LNEReferralInformationDate,
    LNEReferralInformationPDF,
    LNEReferralInformationScan,
    LNEReferralInformationUploadDate,
    LNEClientReferralForm,
    LNEClientReferralFormDate,
    LNEClientReferralFormPDF,
    LNEClientReferralFormScan,
    LNEClientReferralFormUploadDate,
    LNEHNSEligibilityForm,
    LNEHNSEligibilityFormDate,
    LNEHNSEligibilityFormPDF,
    LNEHNSEligibilityFormScan,
    LNEHNSEligibilityFormUploadDate
  ],
      }
      db
        .query(query)
        .then((response) =>{
         
          res.status(200).send(response)
          console.log("client updated",response)
        }
        )
        .catch((e) => {
          console.log(e)
          res.send(e.stack)
        });
    } catch (error) {
      console.log("error message:", error);
      res.send("an error ocurred while trying to update msa form");
      
    }
  },
  updateMsaFormFromProgressNote: async (req, res) => {
    console.log("req.body",req.body)
    
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
      clientId,
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
      const query = await {
        name: "update-msa-form-progress-note",
        text: `update msa_form set 
        clientId=$1,
        AIRSCollateralInformation=$2,
        AIRSCollateralInformationDate=$3,
        AIRSFinancialInformation=$4,
        AIRSFinancialInformationDate=$5,
        AIRSHIVAIDSRiskHistory=$6,
        AIRSHIVAIDSRiskHistoryDate=$7,
        AIRSHCVHistory=$8,
        AIRSHCVHistoryDate=$9,
        AIRSHousingInformation=$10,
        AIRSHousingInformationDate=$11,
        AIRSInsuranceInformation=$12,
        AIRSInsuranceInformationDate=$13,
        AIRSSubstanceUseHistory=$14,
        AIRSSubstanceUseHistoryDate=$15,
        LNEClientRights=$16,
        LNEClientRightsDate=$17,
        LNEClientGrievancePolicyProcedure=$18,
        LNEClientGrievancePolicyProcedureDate=$19,
        LNEProgramRules=$20,
        LNEProgramRulesDate=$21,
        LNEEmergencyContactConsent=$22,
        LNEEmergencyContactConsentDate=$23,
        LNEConsentForReleaseOfConfidentialInformation=$24,
        LNEConsentForReleaseOfConfidentialInformationDate=$25,
        HIPPAConsentForm=$26,
        HIPPAConsentFormDate=$27,
        NYCDOHMHNoticeOfPrivacyPractices=$28,
        NYCDOHMHNoticeOfPrivacyPracticesDate=$29,
        LNEOutreachRetentionTrackingForm=$30,
        LNEOutreachRetentionTrackingFormDate=$31,
        LNEReferralInformation=$32,
        LNEReferralInformationDate=$33,
        LNEClientReferralForm=$34,
        LNEClientReferralFormDate=$35,
        LNEHNSEligibilityForm=$36,
        LNEHNSEligibilityFormDate=$37 where clientId=$1`,
        values: [
          clientId,
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
          LNEHNSEligibilityFormDate
        ],
      };
      db
        .query(query)
        .then((response) =>{
         console.log("updated del update",response)
          res.status(200).send(response)
        }
        )
        .then(response=>console.log("msa updated successfully"))
        .catch((e) => res.send(e.stack));
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },
  

};
