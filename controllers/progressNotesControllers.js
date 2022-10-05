const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
    getProgressNoteByClientId: async (req,res)=>{
        let { clientid } = await req.params;
      
        const query = {
          text: `
          select clients.*, 
          services_action_plan.goal1servicecategory,
          services_action_plan.goal1summary,
          services_action_plan.goal1targetdate,
          services_action_plan.goal2servicecategory,
          services_action_plan.goal2summary,
          services_action_plan.goal2targetdate,
          services_action_plan.goal3servicecategory,
          services_action_plan.goal3summary,
          services_action_plan.goal3targetdate,
          msa_form.airscollateralinformation ,
          msa_form.airscollateralinformationdate,
          msa_form.airsfinancialinformation,
          msa_form.airsfinancialinformationdate,
          msa_form.airshivaidsriskhistory ,
          msa_form.airshivaidsriskhistorydate ,
          msa_form.airshcvhistory ,
          msa_form.airshcvhistorydate ,
          msa_form.airshousinginformation,
          msa_form.airshousinginformationdate,
          msa_form.airsinsuranceinformation ,
          msa_form.airsinsuranceinformationdate ,
          msa_form.airssubstanceusehistory,
          msa_form.airssubstanceusehistorydate,
          msa_form.lneclientrights ,
          msa_form.lneclientrightsdate ,
          msa_form.lneclientgrievancepolicyprocedure,
          msa_form.lneclientgrievancepolicyproceduredate,
          msa_form.lneprogramrules,
          msa_form.lneprogramrulesdate,
          msa_form.lneemergencycontactconsent,
          msa_form.lneemergencycontactconsentdate,
          msa_form.lneconsentforreleaseofconfidentialinformation,
          msa_form.lneconsentforreleaseofconfidentialinformationdate,
          msa_form.hippaconsentform,
          msa_form.hippaconsentformdate,
          msa_form.nycdohmhnoticeofprivacypractices,
          msa_form.nycdohmhnoticeofprivacypracticesdate,
          msa_form.lneoutreachretentiontrackingform,
          msa_form.lneoutreachretentiontrackingformdate,
          msa_form.lnereferralinformation,
          msa_form.lnereferralinformationdate,
          msa_form.lneclientreferralform,
          msa_form.lneclientreferralformdate,
          msa_form.lnehnseligibilityform,
          msa_form.lnehnseligibilityformdate,
          progress_note.progressnotedate as lastprogressnotedate,
          progress_note.goal1completed as goal1completed,
          progress_note.goal2completed as goal2completed,
          progress_note.goal3completed as goal3completed
          from clients 
          full outer join services_action_plan on  clients.clientid = services_action_plan.clientid 
          full outer join msa_form on msa_form.clientid = clients.clientid  
          full outer join progress_note on progress_note.clientid = clients.clientid
          where clients.clientid=$1 order by id asc limit 1`,
          values: [clientid],
        };
        try {
          const allData = await db.query(query);
          const response = allData.rows;
        /*   console.log("response", response); */
          console.log("response length", allData.rows[0]);
          res.send(response);
        } catch (e) {
          console.log("response");
        }
    },
    createProgressNote: async (req,res)=> {

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
            clientFirstName,
            clientLastName,
            clientHCWID,
            userFirstName,
            userLastName,
            progressNoteDate,
            developmentActionPlan,
            CD4VLLabReport,
            transportationCoordination,
            translationInterpretation,
            comprehensiveBehavioralRiskAssessment,
            ticklerUpdate,
            treatmentEducation,
            preventionCounselling,
            supportiveCounselling,
            escort,
            caseClosureDischarge,
            linkageToServices,
            OtherAssistance,
            goal1Progress,
            goal1ProgressDate,
            goal2Progress,
            goal2ProgressDate,
            goal3Progress,
            goal3ProgressDate,
            goal1Completed,
            goal1CompletedDate,
            goal2Completed,
            goal2CompletedDate,
            goal3Completed,
            goal3CompletedDate,
            AIRSCollateralInformation,
            AIRSFinancialInformation,
            AIRSHIVAIDSRiskHistory,
            AIRSHCVHistory,
            AIRSHousingInformation,
            AIRSInsuranceInformation,
            AIRSSubstanceUseHistory,
            LNEClientRights,
            LNEClientGrievancePolicyProcedure,
            LNEProgramRules,
            LNEEmergencyContactConsent,
            LNEConsentForReleaseOfConfidentialInformation,
            HIPAAConsentForm,
            NYCDOHMHNoticeOfPrivacyPractices,
            LNEOutreachRetentionTrackingForm,
            LNEReferralInformation,
            LNEClientReferralForm,
            LNEHNSEligibilityForm,
            progressNoteText,
            HCWSignature,
            clientUniqueId,
            goal1ProgressComments,
            goal2ProgressComments,
            goal3ProgressComments,
            goal1CompletionComments,
            goal2CompletionComments,
            goal3CompletionComments
        } = req.body.clientData

        console.log()

        const query ={
            text:`
            insert into progress_note(
            clientId,
            clientFirstName,
            clientLastName,
            clientHCWID,
            userFirstName,
            userLastName,
            progressNoteDate,
            developmentActionPlan,
            CD4VLLabReport,
            transportationCoordination,
            translationInterpretation,
            comprehensiveBehavioralRiskAssessment,
            ticklerUpdate,
            treatmentEducation,
            preventionCounselling,
            supportiveCounselling,
            escort,
            caseClosureDischarge,
            linkageToServices,
            OtherAssistance,
            goal1Progress,
            goal1ProgressDate,
            goal2Progress,
            goal2ProgressDate,
            goal3Progress,
            goal3ProgressDate,
            goal1Completed,
            goal1CompletedDate,
            goal2Completed,
            goal2CompletedDate,
            goal3Completed,
            goal3CompletedDate,
            AIRSCollateralInformation,
            AIRSFinancialInformation,
            AIRSHIVAIDSRiskHistory,
            AIRSHCVHistory,
            AIRSHousingInformation,
            AIRSInsuranceInformation,
            AIRSSubstanceUseHistory,
            LNEClientRights,
            LNEClientGrievancePolicyProcedure,
            LNEProgramRules,
            LNEEmergencyContactConsent,
            LNEConsentForReleaseOfConfidentialInformation,
            HIPAAConsentForm,
            NYCDOHMHNoticeOfPrivacyPractices,
            LNEOutreachRetentionTrackingForm,
            LNEReferralInformation,
            LNEClientReferralForm,
            LNEHNSEligibilityForm,
            progressNoteText,
            HCWSignature,
            clientUniqueId,
            goal1ProgressComments,
            goal2ProgressComments,
            goal3ProgressComments,
            goal1CompletionComments,
            goal2CompletionComments,
            goal3CompletionComments
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,
              $20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,
              $37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59) RETURNING *`,
            values:[
                clientId,
                clientFirstName,
                clientLastName,
                clientHCWID,
                userFirstName,
                userLastName,
                progressNoteDate,
                developmentActionPlan,
                CD4VLLabReport,
                transportationCoordination,
                translationInterpretation,
                comprehensiveBehavioralRiskAssessment,
                ticklerUpdate,
                treatmentEducation,
                preventionCounselling,
                supportiveCounselling,
                escort,
                caseClosureDischarge,
                linkageToServices,
                OtherAssistance,
                goal1Progress,
                goal1ProgressDate,
                goal2Progress,
                goal2ProgressDate,
                goal3Progress,
                goal3ProgressDate,
                goal1Completed,
                goal1CompletedDate,
                goal2Completed,
                goal2CompletedDate,
                goal3Completed,
                goal3CompletedDate,
                AIRSCollateralInformation,
                AIRSFinancialInformation,
                AIRSHIVAIDSRiskHistory,
                AIRSHCVHistory,
                AIRSHousingInformation,
                AIRSInsuranceInformation,
                AIRSSubstanceUseHistory,
                LNEClientRights,
                LNEClientGrievancePolicyProcedure,
                LNEProgramRules,
                LNEEmergencyContactConsent,
                LNEConsentForReleaseOfConfidentialInformation,
                HIPAAConsentForm,
                NYCDOHMHNoticeOfPrivacyPractices,
                LNEOutreachRetentionTrackingForm,
                LNEReferralInformation,
                LNEClientReferralForm,
                LNEHNSEligibilityForm,
                progressNoteText,
                HCWSignature,
                clientUniqueId,
                goal1ProgressComments,
            goal2ProgressComments,
            goal3ProgressComments,
            goal1CompletionComments,
            goal2CompletionComments,
            goal3CompletionComments
            ]
        }
        try {
                db.query(query)
                .then((data) => {
      
                  res.status(200).json({message:"progress note saved successfully",progress_note_id:data.rows[0].id})})
               
                .catch((e) => console.error(e.stack))
        } catch(e){
            res.send(e)
        }
        

    },
    getAllProgressNoteForClientProfileByClientUniqueId: async (req,res)=>{
      let { clientid } = await req.params;

      console.log("req.params",req.params)
      const query = {
        text: `select * from progress_note pn where pn.id=$1`,
        values: [clientid],
      };
      try {
        const allData = await db.query(query);
        const response = allData.rows;
      /*   console.log("response", response); */
        console.log("response profile all", allData);
        res.send(response);
      } catch (e) {
        console.log("response");
      }
  },
  getProgressNoteForClientProfileByClientUniqueId: async (req,res)=>{
    let { clientid,id } =  req.params;
console.log("req.params",req.params)

    const query = {
      text: `select clients.*, 
      services_action_plan.goal1servicecategory,
      services_action_plan.goal1summary,
      services_action_plan.goal1targetdate,
      services_action_plan.goal2servicecategory,
      services_action_plan.goal2summary,
      services_action_plan.goal2targetdate,
      services_action_plan.goal3servicecategory,
      services_action_plan.goal3summary,
      services_action_plan.goal3targetdate,
      msa_form.airscollateralinformation ,
      msa_form.airscollateralinformationdate,
      msa_form.airsfinancialinformation,
      msa_form.airsfinancialinformationdate,
      msa_form.airshivaidsriskhistory ,
      msa_form.airshivaidsriskhistorydate ,
      msa_form.airshcvhistory ,
      msa_form.airshcvhistorydate ,
      msa_form.airshousinginformation,
      msa_form.airshousinginformationdate,
      msa_form.airsinsuranceinformation ,
      msa_form.airsinsuranceinformationdate ,
      msa_form.airssubstanceusehistory,
      msa_form.airssubstanceusehistorydate,
      msa_form.lneclientrights ,
      msa_form.lneclientrightsdate ,
      msa_form.lneclientgrievancepolicyprocedure,
      msa_form.lneclientgrievancepolicyproceduredate,
      msa_form.lneprogramrules,
      msa_form.lneprogramrulesdate,
      msa_form.lneemergencycontactconsent,
      msa_form.lneemergencycontactconsentdate,
      msa_form.lneconsentforreleaseofconfidentialinformation,
      msa_form.lneconsentforreleaseofconfidentialinformationdate,
      msa_form.hippaconsentform,
      msa_form.hippaconsentformdate,
      msa_form.nycdohmhnoticeofprivacypractices,
      msa_form.nycdohmhnoticeofprivacypracticesdate,
      msa_form.lneoutreachretentiontrackingform,
      msa_form.lneoutreachretentiontrackingformdate,
      msa_form.lnereferralinformation,
      msa_form.lnereferralinformationdate,
      msa_form.lneclientreferralform,
      msa_form.lneclientreferralformdate,
      msa_form.lnehnseligibilityform,
      msa_form.lnehnseligibilityformdate,
      progress_note.*
      from clients 
      full outer join services_action_plan on  clients.clientid = services_action_plan.clientid 
      full outer join msa_form on msa_form.clientid = clients.clientid  
      full outer join progress_note  on progress_note.clientid = clients.clientid
      where clients.clientid=$1 and progress_note.id=$2 `,
      values: [clientid,id],
    };
    try {
      const allData = await db.query(query);
      const response = allData.rows;
      
      res.send(response);
    } catch (e) {
      console.log("response",e);
    }
},


updateProgressNote: async (req, res) => {
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
    progressNoteId,
    clientId,
  clientFirstName,
  clientLastName,
  clientHCWID,
  userFirstName,
  userLastName,
  progressNoteDate,
  developmentActionPlan,
  CD4VLLabReport,
  transportationCoordination,
  translationInterpretation,
  comprehensiveBehavioralRiskAssessment,
  ticklerUpdate,
  treatmentEducation,
  preventionCounselling,
  supportiveCounselling,
  escort,
  caseClosureDischarge,
  linkageToServices,
  OtherAssistance,
  goal1Progress,
  goal1ProgressDate,
  goal2Progress,
  goal2ProgressDate,
  goal3Progress,
  goal3ProgressDate,
  goal1Completed,
  goal1CompletedDate,
  goal2Completed,
  goal2CompletedDate,
  goal3Completed,
  goal3CompletedDate,
  StatusChangesForm,
  ComprehensiveRiskBehaviorAssessmentUpdates,
  M11QForm,
  CD4VLReports,
  InitialTreatmentAdherenceIntake,
  TreatmentAdherenceUpdates,
  AIRSCollateralInformation,
  AIRSDrugRegimen,
  AIRSFinancialInformation,
  AIRSHIVAIDSRiskHistory,
  AIRSHIVStatusHistory,
  AIRSHIVMedicalProvider,
  AIRSHCVHistory,
  AIRSHousingInformation,
  AIRSInsuranceInformation,
  AIRSSubstanceUseHistory,
  LNEClientRights,
  LNEClientGrievancePolicyProcedure,
  LNEProgramRules,
  LNEEmergencyContactConsent,
  LNEConsentForReleaseOfConfidentialInformation,
  HIPPAConsentForm,
  NYCDOHMHNoticeOfPrivacyPractices,
  LNEOutreachRetentionTrackingForm,
  LNEReferralInformation,
  LNEClientReferralForm,
  LNEHNSEligibilityForm,
  SupportGroups,
  IDG,
  progressNoteText,
  HCWSignature,
  clientUniqueId,
  goal1ProgressComments,
  goal2ProgressComments,
  goal3ProgressComments,
  goal1CompletionComments,
  goal2CompletionComments,
  goal3CompletionComments,
  } = req.body.clientData;

  try {
    const query = await {
      text: `update progress_note set 
      clientId=$1,
  clientFirstName=$2,
  clientLastName=$3,
  clientHCWID=$4,
  userFirstName=$5,
  userLastName=$6,
  progressNoteDate=$7,
  developmentActionPlan=$8,
  CD4VLLabReport=$9,
  transportationCoordination=$10,
  translationInterpretation=$11,
  comprehensiveBehavioralRiskAssessment=$12,
  ticklerUpdate=$13,
  treatmentEducation=$14,
  preventionCounselling=$15,
  supportiveCounselling=$16,
  escort=$17,
  caseClosureDischarge=$18,
  linkageToServices=$19,
  OtherAssistance=$20,
  goal1Progress=$21,
  goal1ProgressDate=$22,
  goal2Progress=$23,
  goal2ProgressDate=$24,
  goal3Progress=$25,
  goal3ProgressDate=$26,
  goal1Completed=$27,
  goal1CompletedDate=$28,
  goal2Completed=$29,
  goal2CompletedDate=$30,
  goal3Completed=$31,
  goal3CompletedDate=$32,
  StatusChangesForm=$33,
  ComprehensiveRiskBehaviorAssessmentUpdates=$34,
  M11QForm=$35,
  CD4VLReports=$36,
  InitialTreatmentAdherenceIntake=$37,
  TreatmentAdherenceUpdates=$38,
  AIRSCollateralInformation=$39,
  AIRSDrugRegimen=$40,
  AIRSFinancialInformation=$41,
  AIRSHIVAIDSRiskHistory=$42,
  AIRSHIVStatusHistory=$43,
  AIRSHIVMedicalProvider=$44,
  AIRSHCVHistory=$45,
  AIRSHousingInformation=$46,
  AIRSInsuranceInformation=$47,
  AIRSSubstanceUseHistory=$48,
  LNEClientRights=$49,
  LNEClientGrievancePolicyProcedure=$50,
  LNEProgramRules=$51,
  LNEEmergencyContactConsent=$52,
  LNEConsentForReleaseOfConfidentialInformation=$53,
  HIPPAConsentForm=$54,
  NYCDOHMHNoticeOfPrivacyPractices=$55,
  LNEOutreachRetentionTrackingForm=$56,
  LNEReferralInformation=$57,
  LNEClientReferralForm=$58,
  LNEHNSEligibilityForm=$59,
  SupportGroups=$60,
  IDG=$61,
  progressNoteText=$62,
  HCWSignature=$63,
  clientUniqueId=$64,
  goal1ProgressComments=$65,
  goal2ProgressComments=$66,
  goal3ProgressComments=$67,
  goal1CompletionComments=$68,
  goal2CompletionComments=$69,
  goal3CompletionComments=$70
   where progress_note.id=$71`,
      values: [
        clientId,
        clientFirstName,
        clientLastName,
        clientHCWID,
        userFirstName,
        userLastName,
        progressNoteDate,
        developmentActionPlan,
        CD4VLLabReport,
        transportationCoordination,
        translationInterpretation,
        comprehensiveBehavioralRiskAssessment,
        ticklerUpdate,
        treatmentEducation,
        preventionCounselling,
        supportiveCounselling,
        escort,
        caseClosureDischarge,
        linkageToServices,
        OtherAssistance,
        goal1Progress,
        goal1ProgressDate,
        goal2Progress,
        goal2ProgressDate,
        goal3Progress,
        goal3ProgressDate,
        goal1Completed,
        goal1CompletedDate,
        goal2Completed,
        goal2CompletedDate,
        goal3Completed,
        goal3CompletedDate,
        StatusChangesForm,
        ComprehensiveRiskBehaviorAssessmentUpdates,
        M11QForm,
        CD4VLReports,
        InitialTreatmentAdherenceIntake,
        TreatmentAdherenceUpdates,
        AIRSCollateralInformation,
        AIRSDrugRegimen,
        AIRSFinancialInformation,
        AIRSHIVAIDSRiskHistory,
        AIRSHIVStatusHistory,
        AIRSHIVMedicalProvider,
        AIRSHCVHistory,
        AIRSHousingInformation,
        AIRSInsuranceInformation,
        AIRSSubstanceUseHistory,
        LNEClientRights,
        LNEClientGrievancePolicyProcedure,
        LNEProgramRules,
        LNEEmergencyContactConsent,
        LNEConsentForReleaseOfConfidentialInformation,
        HIPPAConsentForm,
        NYCDOHMHNoticeOfPrivacyPractices,
        LNEOutreachRetentionTrackingForm,
        LNEReferralInformation,
        LNEClientReferralForm,
        LNEHNSEligibilityForm,
        SupportGroups,
        IDG,
        progressNoteText,
        HCWSignature,
        clientUniqueId,
        goal1ProgressComments,
        goal2ProgressComments,
        goal3ProgressComments,
        goal1CompletionComments,
        goal2CompletionComments,
        goal3CompletionComments,
        progressNoteId
      ],
    };
    db
      .query(query)
      .then((response) =>{
       console.log("updated del update",response)
        res.status(200).send({statusText:'OK'})
      }
      )
      .then(response=>console.log("msa updated successfully"))
  } catch (error) {
    res.json("an error ocurred");
    console.log("error message:", error);
  }
},

}




  
