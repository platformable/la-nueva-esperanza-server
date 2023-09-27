const db = require('../dbConnect')
const axios = require('axios')


module.exports= {
  getAllProgressNotes: async (req,res)=>{



    const countQuery = 'SELECT * FROM progress_note';
    const countResult = await db.query(countQuery);
    const totalRecords = await countResult.rows.length;
    console.log("totalRecords",totalRecords)

   const page = parseInt(req.query.page)
   const limit = parseInt(req.query.limit)
   const offset= (page-1) * limit

    const totalPages = Math.ceil(totalRecords / limit);
    console.log("totalPages",totalPages)

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
  
    
  const query = {text:`SELECT id, clientfirstname, clientlastname, progressnotedate,
  developmentactionplan,
  cd4vllabreport,
transportationcoordination,
translationinterpretation,
comprehensivebehavioralriskassessment,
ticklerupdate,
treatmenteducation,
preventioncounselling,
supportivecounselling,
escort,
caseclosuredischarge,
linkagetoservices,
supportgroups,
implementationactionplan,
housingassistance,
benefitsassistance,
employmentassistance,
otherassistance
  FROM progress_note
  order by id 
  LIMIT $1 OFFSET $2`,
  values:[limit, offset]}

  //const query = {text:'select * from progress_note'}

  try {
    const allData = await db.query(query);
          const response = allData.rows;

          const newData= {}
          newData.data=response
          newData.totalPages=totalPages
          newData.page=page
          newData.hasPreviousPage=hasPreviousPage
          newData.hasNextPage=hasNextPage
          res.send(newData);
    
  } catch (error) {
    console.log("errorrrrr",error)
    res.send({errorMessage:error, reviewError:'Check there is query params'})
  }


  },
    getProgressNoteByClientId: async (req,res)=>{
        let { clientid } = await req.params;
      
        const query = {
          text: `
          select distinct  clients.*,
 services_action_plan.id as sapid,
 services_action_plan.planstartdate,
  services_action_plan.goal1servicecategory,
  services_action_plan.goal1summary,
  services_action_plan.goal1details,
  services_action_plan.goal1targetdate,
  services_action_plan.goal1completed as sapgoal1completed,
  services_action_plan.goal1completiondate as sapgoal1completiondate,
  services_action_plan.goal2servicecategory,
  services_action_plan.goal2summary,
  services_action_plan.goal2details,
  services_action_plan.goal2targetdate,
  services_action_plan.goal2completed as sapgoal2completed,
  services_action_plan.goal2completiondate as sapgoal2completiondate,
  services_action_plan.goal3servicecategory,
  services_action_plan.goal3summary,
  services_action_plan.goal3details,
  services_action_plan.goal3targetdate,
  services_action_plan.goal3completed as sapgoal3completed,
  services_action_plan.goal3completiondate as sapgoal3completiondate,
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
  msa_form.statuschangesform,
msa_form.statuschangesformdate,
msa_form.comprehensiveriskbehaviorassessmentupdates,
msa_form.comprehensiveriskbehaviorassessmentupdatesdate,
msa_form.m11qform,
msa_form.m11qformdate,
msa_form.cd4vlreports,
msa_form.cd4vlreportsdate,
msa_form.initialtreatmentadherenceintake,
msa_form.initialtreatmentadherenceintakedate,
msa_form.treatmentadherenceupdates,
msa_form.treatmentadherenceupdatesdate,
msa_form.airsdrugregimen,
msa_form.airsdrugregimendate,
msa_form.airshivstatushistory,
msa_form.airshivstatushistorydate,
msa_form.airshivmedicalprovider,
msa_form.airshivmedicalproviderdate,
msa_form.supportgroups,
msa_form.supportgroupsdate,
msa_form.idgform,
msa_form.idgformdate,
progress_note.progressnotedate as lastprogressnotedate,
progress_note.goal1completed as goal1completed,
progress_note.goal2completed as goal2completed,
progress_note.goal3completed as goal3completed
from clients 
full outer join services_action_plan on  clients.clientid = services_action_plan.clientid 
full outer join msa_form on msa_form.clientid = clients.clientid  
full outer join progress_note on progress_note.clientid = clients.clientid
where clients.clientid=$1 order by services_action_plan.planstartdate desc limit 1 `,
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
            HIPPAConsentForm,
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
            goal3CompletionComments,
            HNSReadinessForm,
            LinkageRetentionAdherenceForms,
            InternalReferralInformation,
            StatusChangesForm,
            ComprehensiveRiskBehaviorAssessmentUpdates,
            M11QForm,
            CD4VLReports,
            InitialTreatmentAdherenceIntake,
            TreatmentAdherenceUpdates,
            AIRSDrugRegimen,
            AIRSHIVStatusHistory,
            AIRSHIVMedicalProvider,
            SupportGroups,
            IDGForm,
            AIRSCollateralInformationDate,
AIRSFinancialInformationDate,
AIRSHIVAIDSRiskHistoryDate,
AIRSHCVHistoryDate,
AIRSHousingInformationDate,
AIRSInsuranceInformationDate,
AIRSSubstanceUseHistoryDate,
LNEClientRightsDate,
LNEClientGrievancePolicyProcedureDate,
LNEProgramRulesDate,
LNEEmergencyContactConsentDate,
LNEConsentForReleaseOfConfidentialInformationDate,
HIPPAConsentFormDate,
NYCDOHMHNoticeOfPrivacyPracticesDate,
LNEOutreachRetentionTrackingFormDate,
LNEReferralInformationDate,
LNEClientReferralFormDate,
LNEHNSEligibilityFormDate,
HNSReadinessFormDate,
LinkageRetentionAdherenceFormsDate,
InternalReferralInformationDate,
StatusChangesFormDate,
ComprehensiveRiskBehaviorAssessmentUpdatesDate,
M11QFormDate,
CD4VLReportsDate,
InitialTreatmentAdherenceIntakeDate,
TreatmentAdherenceUpdatesDate,
AIRSDrugRegimenDate,
AIRSHIVStatusHistoryDate,
AIRSHIVMedicalProviderDate,
SupportGroupsDate,
IDGFormDate,
goal1WorkedComments,
goal2WorkedComments,
goal3WorkedComments,

implementationActionPlan,
housingAssistance,
benefitsAssistance,
employmentAssistance

        } = req.body.clientData



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
            HIPPAConsentForm,
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
            goal3CompletionComments,
            HNSReadinessForm,
            LinkageRetentionAdherenceForms,
            InternalReferralInformation,
            StatusChangesForm,
            ComprehensiveRiskBehaviorAssessmentUpdates,
            M11QForm,
            CD4VLReports,
            InitialTreatmentAdherenceIntake,
            TreatmentAdherenceUpdates,
            AIRSDrugRegimen,
            AIRSHIVStatusHistory,
            AIRSHIVMedicalProvider,
            SupportGroups,
            IDGForm,
            AIRSCollateralInformationDate,
AIRSFinancialInformationDate,
AIRSHIVAIDSRiskHistoryDate,
AIRSHCVHistoryDate,
AIRSHousingInformationDate,
AIRSInsuranceInformationDate,
AIRSSubstanceUseHistoryDate,
LNEClientRightsDate,
LNEClientGrievancePolicyProcedureDate,
LNEProgramRulesDate,
LNEEmergencyContactConsentDate,
LNEConsentForReleaseOfConfidentialInformationDate,
HIPPAConsentFormDate,
NYCDOHMHNoticeOfPrivacyPracticesDate,
LNEOutreachRetentionTrackingFormDate,
LNEReferralInformationDate,
LNEClientReferralFormDate,
LNEHNSEligibilityFormDate,
HNSReadinessFormDate,
LinkageRetentionAdherenceFormsDate,
InternalReferralInformationDate,
StatusChangesFormDate,
ComprehensiveRiskBehaviorAssessmentUpdatesDate,
M11QFormDate,
CD4VLReportsDate,
InitialTreatmentAdherenceIntakeDate,
TreatmentAdherenceUpdatesDate,
AIRSDrugRegimenDate,
AIRSHIVStatusHistoryDate,
AIRSHIVMedicalProviderDate,
SupportGroupsDate,
IDGFormDate,
goal1WorkedComments,
goal2WorkedComments,
goal3WorkedComments,
implementationActionPlan,
housingAssistance,
benefitsAssistance,
employmentAssistance
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,
              $20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,
              $37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,
              $71,$72,$73,$74,$75,$76,$77,$78,$79,$80,$81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,$92,$93,$94,$95,$96,$97,$98,$99,$100,$101,$102,$103,$104,$105,$106,$107,$108,$109,$110,$111,$112) RETURNING *`,
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
                HIPPAConsentForm,
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
            goal3CompletionComments,
            HNSReadinessForm,
            LinkageRetentionAdherenceForms,
            InternalReferralInformation,
            StatusChangesForm,
            ComprehensiveRiskBehaviorAssessmentUpdates,
            M11QForm,
            CD4VLReports,
            InitialTreatmentAdherenceIntake,
            TreatmentAdherenceUpdates,
            AIRSDrugRegimen,
            AIRSHIVStatusHistory,
            AIRSHIVMedicalProvider,
            SupportGroups,
            IDGForm,
            AIRSCollateralInformationDate,
AIRSFinancialInformationDate,
AIRSHIVAIDSRiskHistoryDate,
AIRSHCVHistoryDate,
AIRSHousingInformationDate,
AIRSInsuranceInformationDate,
AIRSSubstanceUseHistoryDate,
LNEClientRightsDate,
LNEClientGrievancePolicyProcedureDate,
LNEProgramRulesDate,
LNEEmergencyContactConsentDate,
LNEConsentForReleaseOfConfidentialInformationDate,
HIPPAConsentFormDate,
NYCDOHMHNoticeOfPrivacyPracticesDate,
LNEOutreachRetentionTrackingFormDate,
LNEReferralInformationDate,
LNEClientReferralFormDate,
LNEHNSEligibilityFormDate,
HNSReadinessFormDate,
LinkageRetentionAdherenceFormsDate,
InternalReferralInformationDate,
StatusChangesFormDate,
ComprehensiveRiskBehaviorAssessmentUpdatesDate,
M11QFormDate,
CD4VLReportsDate,
InitialTreatmentAdherenceIntakeDate,
TreatmentAdherenceUpdatesDate,
AIRSDrugRegimenDate,
AIRSHIVStatusHistoryDate,
AIRSHIVMedicalProviderDate,
SupportGroupsDate,
IDGFormDate,
goal1WorkedComments,
goal2WorkedComments,
goal3WorkedComments,
implementationActionPlan,
housingAssistance,
benefitsAssistance,
employmentAssistance
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
      text: `select distinct clients.*, 
      services_action_plan.goal1servicecategory,
      services_action_plan.goal1summary,
      services_action_plan.goal1details,
      services_action_plan.goal1targetdate,
      services_action_plan.goal2servicecategory,
      services_action_plan.goal2summary,
      services_action_plan.goal2details,
      services_action_plan.goal2targetdate,
      services_action_plan.goal3servicecategory,
      services_action_plan.goal3summary,
      services_action_plan.goal3details,
      services_action_plan.goal3targetdate,
      services_action_plan.planstartdate,
      progress_note.*
      from clients 
      full outer join services_action_plan on  clients.clientid = services_action_plan.clientid 
      full outer join progress_note  on progress_note.clientid = clients.clientid
      where clients.clientid=$1 and progress_note.id=$2 order by services_action_plan.planstartdate desc limit 1`,
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
  HNSReadinessForm,
  LinkageRetentionAdherenceForms,
  InternalReferralInformation,
  IDGForm,
  AIRSCollateralInformationDate,
  AIRSFinancialInformationDate,
  AIRSHIVAIDSRiskHistoryDate,
  AIRSHCVHistoryDate,
  AIRSHousingInformationDate,
  AIRSInsuranceInformationDate,
  AIRSSubstanceUseHistoryDate,
  LNEClientRightsDate,
  LNEClientGrievancePolicyProcedureDate,
  LNEProgramRulesDate,
  LNEEmergencyContactConsentDate,
  LNEConsentForReleaseOfConfidentialInformationDate,
  HIPPAConsentFormDate,
  NYCDOHMHNoticeOfPrivacyPracticesDate,
  LNEOutreachRetentionTrackingFormDate,
  LNEReferralInformationDate,
  LNEClientReferralFormDate,
  LNEHNSEligibilityFormDate,
  HNSReadinessFormDate,
  LinkageRetentionAdherenceFormsDate,
  InternalReferralInformationDate,
  StatusChangesFormDate,
  ComprehensiveRiskBehaviorAssessmentUpdatesDate,
  M11QFormDate,
  CD4VLReportsDate,
  InitialTreatmentAdherenceIntakeDate,
  TreatmentAdherenceUpdatesDate,
  AIRSDrugRegimenDate,
  AIRSHIVStatusHistoryDate,
  AIRSHIVMedicalProviderDate,
  SupportGroupsDate,
  IDGFormDate,
  goal1WorkedComments,
  goal2WorkedComments,
  goal3WorkedComments,
  implementationActionPlan,
housingAssistance,
benefitsAssistance,
employmentAssistance
  } = req.body.clientData;
console.log("pnid",progressNoteId)
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
  goal3CompletionComments=$70,
  HNSReadinessForm=$71,
  LinkageRetentionAdherenceForms=$72,
  InternalReferralInformation=$73,
  IDGForm=$74,
  AIRSCollateralInformationDate=$75,
  AIRSFinancialInformationDate=$76,
  AIRSHIVAIDSRiskHistoryDate=$77,
  AIRSHCVHistoryDate=$78,
  AIRSHousingInformationDate=$79,
  AIRSInsuranceInformationDate=$80,
  AIRSSubstanceUseHistoryDate=$81,
  LNEClientRightsDate=$82,
  LNEClientGrievancePolicyProcedureDate=$83,
  LNEProgramRulesDate=$84,
  LNEEmergencyContactConsentDate=$85,
  LNEConsentForReleaseOfConfidentialInformationDate=$86,
  HIPPAConsentFormDate=$87,
  NYCDOHMHNoticeOfPrivacyPracticesDate=$88,
  LNEOutreachRetentionTrackingFormDate=$89,
  LNEReferralInformationDate=$90,
  LNEClientReferralFormDate=$91,
  LNEHNSEligibilityFormDate=$92,
  HNSReadinessFormDate=$93,
  LinkageRetentionAdherenceFormsDate=$94,
  InternalReferralInformationDate=$95,
  StatusChangesFormDate=$96,
  ComprehensiveRiskBehaviorAssessmentUpdatesDate=$97,
  M11QFormDate=$98,
  CD4VLReportsDate=$99,
  InitialTreatmentAdherenceIntakeDate=$100,
  TreatmentAdherenceUpdatesDate=$101,
  AIRSDrugRegimenDate=$102,
  AIRSHIVStatusHistoryDate=$103,
  AIRSHIVMedicalProviderDate=$104,
  SupportGroupsDate=$105,
  IDGFormDate=$106,
  goal1WorkedComments=$107,
  goal2WorkedComments=$108,
  goal3WorkedComments=$109,
  implementationActionPlan=$110,
housingAssistance=$111,
benefitsAssistance=$112,
employmentAssistance=$113
   where progress_note.id=$114`,
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
        HNSReadinessForm,
        LinkageRetentionAdherenceForms,
        InternalReferralInformation,
        IDGForm,
        AIRSCollateralInformationDate,
        AIRSFinancialInformationDate,
        AIRSHIVAIDSRiskHistoryDate,
        AIRSHCVHistoryDate,
        AIRSHousingInformationDate,
        AIRSInsuranceInformationDate,
        AIRSSubstanceUseHistoryDate,
        LNEClientRightsDate,
        LNEClientGrievancePolicyProcedureDate,
        LNEProgramRulesDate,
        LNEEmergencyContactConsentDate,
        LNEConsentForReleaseOfConfidentialInformationDate,
        HIPPAConsentFormDate,
        NYCDOHMHNoticeOfPrivacyPracticesDate,
        LNEOutreachRetentionTrackingFormDate,
        LNEReferralInformationDate,
        LNEClientReferralFormDate,
        LNEHNSEligibilityFormDate,
        HNSReadinessFormDate,
        LinkageRetentionAdherenceFormsDate,
        InternalReferralInformationDate,
        StatusChangesFormDate,
        ComprehensiveRiskBehaviorAssessmentUpdatesDate,
        M11QFormDate,
        CD4VLReportsDate,
        InitialTreatmentAdherenceIntakeDate,
        TreatmentAdherenceUpdatesDate,
        AIRSDrugRegimenDate,
        AIRSHIVStatusHistoryDate,
        AIRSHIVMedicalProviderDate,
        SupportGroupsDate,
        IDGFormDate,
        goal1WorkedComments,
        goal2WorkedComments,
        goal3WorkedComments,
        implementationActionPlan,
        housingAssistance,
        benefitsAssistance,
        employmentAssistance,
        progressNoteId
      ],
    };
    db
      .query(query)
      .then((response) =>{
       console.log("updated del pn")
        res.status(200).send({statusText:'OK'})
      }
      )
      .then(response=>console.log("msa updated successfully"))
  } catch (error) {
    res.json("an error ocurred");
    console.log("error message:", error);
  }
},
deleteProgressNote:async(req,res)=>{
  console.log(req.body)
  const { id } = req.body;
  const query = {
    text: "DELETE from progress_note where id=$1",
    values: [id],
  };
  db.query(query)
    .then((data) => {
 console.log("success")
        res.send({
          statusText: "OK",
          message: "Progress Note deleted",
        });
   
    })
    .catch((e) => console.error(e.stack));
},

sapForProgressNotes: async (req,res)=>{
  console.log("sapforprogressnotes")

  const {clientid}=req.params

  try{
    const query = {text:'select * from services_action_plan sap where clientid=$1 order by planstartdate desc limit 2',values:[clientid]};
    const response = await db.query(query);
    const data={current:response.rows[0],archived:response.rows[1]}
    res.send(data)
console.log("data",data)

  }catch {(e)=>{
    res.status(500).send({errorMessage:"An error ocurred", error:e})
    console.log("error",e)
  }}
}

}




  
