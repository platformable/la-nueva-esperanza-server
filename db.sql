create table users (
    user_id SERIAL PRIMARY KEY,
    name varchar (120) NOT NULL,
    lastname varchar (120) NOT NULL,
    userRole varchar (120) NOT NULL,
    userEmail varchar(255) NOT NULL,
    datelastlogin DATE,
    dateaccountactivated DATE
)


create table authorizedusers (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL
    lastname varchar (120) NOT NULL,
    email  varchar(255) not null,
    role varchar(50),
    isactive varchar(50) NOT NULL,
    dateaccountactivated DATE
)

create table clients (
    id SERIAL PRIMARY KEY,
    clientFirstName text,
    clientLastName text,
    clientSSN int,
    clientActive BIT,
    clientHCWID int,
    clientId text
)


create clients_action_plan(
    id serial primary key,
    clientId text,
    clientFirstName text,
    clientLastName text,
    planStartDate date,
    userFirstName text,
    userLastName text,
    goalServiceCategory text,
    goal1Summary text,
    goal1Detail text,
    goal1TargetDate DATE,
    goal1ActionStep1 text,
    goal1ActionStep2 text,
    goal1ActionStep3 text,
    goal2ServiceCategory text,
    goal2Summary text,
    goal2Detail text,
    goal2TargetDate DATE,
    goal2ActionStep1 text,
    goal2ActionStep2 text,
    goal2ActionStep3 text,
    goal3ServiceCategory text,
    goal3Summary text,
    goal3Detail text,
    goal3TargetDate DATE,
    goal3ActionStep1 text,
    goal3ActionStep2 text,
    goal3ActionStep3 text,
    comments text,
    clientSignature bit,
    clientSignatureDate DATE,
    HCWSignature bit,
    HCWSignatureDate DATE,
    supervisorSignature bit,
)

create table msa_form (
    id serial primary key,
dateFormReviewed date,
clientID text,
clientFirstName text,
clientLastName text,
clientHCWID text,
userFirstName text,
userLastName text,
AIRSIntakeForm bit,
AIRSIntakeFormDate date
ComprehensiveRiskBehaviorAssessment bit
ComprehensiveRiskBehaviorAssessmentDate date 
ServiceActionPlan bit
ServiceActionPlanDate date 
AIRSCollateralInformation bit
AIRSCollateralInformationDate date 
AIRSFinancialInformation bit,
AIRSFinancialInformationDate date,
AIRSHIVAIDSRiskHistory bit,
AIRSHIVAIDSRiskHistoryDate date,
AIRSHCVHistory bit
AIRSHCVHistoryDate date 
AIRSHousingInformation bit,
AIRSHousingInformationDate date,
AIRSInsuranceInformation bit,
AIRSInsuranceInformationDate date,
AIRSSubstanceUseHistory bit,
AIRSSubstanceUseHistoryDate date,
LNEClientRights bit,
LNEClientRightsDate date,
LNEClientGrievancePolicyProcedure bit,
LNEClientGrievancePolicyProcedureDate date,
LNEProgramRules bit,
LNEProgramRulesDate date,
LNEEmergencyContactConsent bit, 
LNEEmergencyContactConsentDate date,
LNEConsentForReleaseOfConfidentialInformation bit,
LNEConsentForReleaseOfConfidentialInformationDate date,
HIPPAConsentForm bit,
HIPPAConsentFormDate date
NYCDOHMHNoticeOfPrivacyPractices bit,
NYCDOHMHNoticeOfPrivacyPracticesDate date,
LNEOutreachRetentionTrackingForm bit,
LNEOutreachRetentionTrackingFormDate date,
LNEReferralInformation bit,
LNEReferralInformationDate date,
LNEClientReferralForm bit,
LNEClientReferralFormDate date,
LNEHNSEligibilityForm bit,
LNEHNSEligibilityFormDate date
)

create table impact_form_baseline (
    id serial primary key,
    impactFormStartDate date,
    barrierHIVPrimaryCare bit,
    barrierAccessingMedications bit, 
    medicationAdherence bit,
    CD4ViralLoad bit,
    lastHIVTest bit,
    PrEP bit,
    unsafeSexualBehavior bit,
    substanceAbuse bit,
    riskOfOverdose bit,
    mentalHealthIssues bit,
    unstableHousing bit,
    foodInsecurity bit,
    legalIssues bit,
    unstableEmployment bit 
)

create table progress_notes (
    id SERIAL PRIMARY KEY,
    progressNoteDate date,
clientID text,
clientFirstName text,
clientLastName text,
clientHCWID text,
userFirstName text,
userLastName text,
developmentActionPlan bit,
CD4VLLabReport bit,
transportationCoordination bit,
translationInterpretation bit,
comprehensiveBehavioralRiskAssessment bit,
ticklerUpdate bit,
treatmentEducation bit,
preventionCounselling bit,
supportiveCounselling bit,
escort bit,
caseClosureDischarge bit,
linkageToServices bit,
OtherAssistance bit,
goal1Progress bit,
goal1ProgressDate date, 
goal2Progress bit,
goal2ProgressDate date,
goal3Progress bit,
goal3ProgressDate date,
goal1Completed bit,
goal1CompletedDate date,
goal2Completed bit,
goal2CompletedDate date,
goal3Completed bit,
goal3CompletedDate date,
AIRSCollateralInformation bit,
AIRSFinancialInformation bit,
AIRSHIVAIDSRiskHistory bit,
AIRSHCVHistory bit,
AIRSHousingInformation bit,
AIRSInsuranceInformation bit,
AIRSSubstanceUseHistory bit,
LNEClientRights bit,
LNEClientGrievancePolicyProcedure bit,
LNEProgramRules bit,
LNEEmergencyContactConsent bit,
LNEConsentForReleaseOfConfidentialInformation bit,
HIPAAConsentForm bit,
NYCDOHMHNoticeOfPrivacyPractices bit,
LNEOutreachRetentionTrackingForm bit,
LNEReferralInformation bit,
LNEClientReferralForm bit,
LNEHNSEligibilityForm bit,
)



AIRSIntakeFormReviewed
AIRSIntakeFormIssues
ComprehensiveRiskBehaviorAssessmentIssues
ComprehensiveRiskBehaviorAssessmentReviewed 
HNSEligibilityFormReviewed 
HNSEligibilityFormIssues 
HNSReadinessFormReviewed 
HNSReadinessFormIssues 
ServiceActionPlanReview
ServiceActionPlanIssues
ProgressNoteReviewed
ProgressNoteIssues
StatusChangesFormReviewed
StatusChangesFormIssues
ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
ComprehensiveRiskBehaviorAssessmentUpdatesIssues
M11QFormReviewed 
M11QFormIssues
CD4VLReportsReviewed 
CD4VLReportsIssues
InitialTreatmentAdherenceIntakeReviewed 
InitialTreatmentAdherenceIntakeIssues 
TreatmentAdherenceUpdatesReviewed 
TreatmentAdherenceUpdatesIssues
AIRSCollateralInformationReviewed 
AIRSCollateralInformationIssues  
AirsDrugRegimenReviewed  
AirsDrugRegimenIssues 
AIRSFinancialInformationReviewed 
AIRSFinancialInformationIssues 
AIRSHIVAIDSRiskHistoryReviewed 
AIRSHIVAIDSRiskHistoryIssues 
AirsHIVMedicalProviderReviewed 
AirsHIVMedicalProviderIssues 
AIRSHIVStatusHistoryReviewed 
AIRSHIVStatusHistoryIssues 
AIRSHCVHistoryReviewed 
AIRSHCVHistoryIssues 
AIRSHousingInformationReviewed 
AIRSHousingInformationIssues 
AIRSInsuranceInformationReviewed 
AIRSInsuranceInformationIssues 
AIRSSubstanceUseHistoryReviewed 
AIRSSubstanceUseHistoryIssues 
LNEClientRightsReviewed 
LNEClientRightsIssues 
LNEClientGrievancePolicyProcedureReviewed 
LNEClientGrievancePolicyProcedureIssues
LNEProgramRulesReviewed 
LNEProgramRulesIssues 
LNEEmergencyContactConsentReviewed 
LNEEmergencyContactConsentIssues 
LNEConsentForReleaseOfConfidentialInformationReviewed 
LNEConsentForReleaseOfConfidentialInformationIssues 
HIPAAConsentFormReviewed 
HIPAAConsentFormIssues 
NYCDOHMHNoticeOfPrivacyPracticesReviewed 
NYCDOHMHNoticeOfPrivacyPracticesIssues 
LinkageRetentionAdherenceFormsReviewed 
LinkageRetentionAdherenceFormsIssues 
InternalReferralInformationReviewed 
InternalReferralInformationIssues 
IdentificationReviewed 
IdentificationIssues 
SupportGroupsReviewed 
SupportGroupsIssues 
IDGFormReviewed 
IDGFormIssues 





ALTER TABLE msa_form
ADD AIRSIntakeFormReviewed bit,
ADD AIRSIntakeFormIssues bit,
ADD ComprehensiveRiskBehaviorAssessmentIssues bit,
ADD ComprehensiveRiskBehaviorAssessmentReviewed  bit,
ADD HNSEligibilityFormReviewed  bit,
ADD HNSEligibilityFormIssues  bit,
ADD HNSReadinessFormReviewed  bit,
ADD HNSReadinessFormIssues  bit,
ADD ServiceActionPlanReview bit,
ADD ServiceActionPlanIssues bit,
ADD ProgressNoteReviewed bit,
ADD ProgressNoteIssues bit,
ADD StatusChangesFormReviewed bit,
ADD StatusChangesFormIssues bit,
ADD ComprehensiveRiskBehaviorAssessmentUpdatesReviewed bit,
ADD ComprehensiveRiskBehaviorAssessmentUpdatesIssues bit,
ADD M11QFormReviewed  bit,
ADD M11QFormIssues bit,
ADD CD4VLReportsReviewed  bit,
ADD CD4VLReportsIssues bit,
ADD InitialTreatmentAdherenceIntakeReviewed  bit,
ADD InitialTreatmentAdherenceIntakeIssues  bit,
ADD TreatmentAdherenceUpdatesReviewed  bit,
ADD TreatmentAdherenceUpdatesIssues bit,
ADD AIRSCollateralInformationReviewed  bit,
ADD AIRSCollateralInformationIssues   bit,
ADD AirsDrugRegimenReviewed   bit,
ADD AirsDrugRegimenIssues  bit,
ADD AIRSFinancialInformationReviewed  bit,
ADD AIRSFinancialInformationIssues  bit,
ADD AIRSHIVAIDSRiskHistoryReviewed  bit,
ADD AIRSHIVAIDSRiskHistoryIssues  bit,
ADD AirsHIVMedicalProviderReviewed  bit,
ADD AirsHIVMedicalProviderIssues  bit,
ADD AIRSHIVStatusHistoryReviewed  bit,
ADD AIRSHIVStatusHistoryIssues  bit,
ADD AIRSHCVHistoryReviewed  bit,
ADD AIRSHCVHistoryIssues  bit,
ADD AIRSHousingInformationReviewed  bit,
ADD AIRSHousingInformationIssues  bit,
ADD AIRSInsuranceInformationReviewed  bit,
ADD AIRSInsuranceInformationIssues  bit,
ADD AIRSSubstanceUseHistoryReviewed  bit,
ADD AIRSSubstanceUseHistoryIssues  bit,
ADD LNEClientRightsReviewed  bit,
ADD LNEClientRightsIssues  bit,
ADD LNEClientGrievancePolicyProcedureReviewed  bit,
ADD LNEClientGrievancePolicyProcedureIssues bit,
ADD LNEProgramRulesReviewed  bit,
ADD LNEProgramRulesIssues  bit,
ADD LNEEmergencyContactConsentReviewed  bit,
ADD LNEEmergencyContactConsentIssues  bit,
ADD LNEConsentForReleaseOfConfidentialInformationReviewed  bit,
ADD LNEConsentForReleaseOfConfidentialInformationIssues  bit,
ADD HIPAAConsentFormReviewed  bit,
ADD HIPAAConsentFormIssues  bit,
ADD NYCDOHMHNoticeOfPrivacyPracticesReviewed  bit,
ADD NYCDOHMHNoticeOfPrivacyPracticesIssues  bit,
ADD LinkageRetentionAdherenceFormsReviewed  bit,
ADD LinkageRetentionAdherenceFormsIssues  bit,
ADD InternalReferralInformationReviewed  bit,
ADD InternalReferralInformationIssues  bit,
ADD IdentificationReviewed  bit,
ADD IdentificationIssues  bit,
ADD SupportGroupsReviewed  bit,
ADD SupportGroupsIssues  bit,
ADD IDGFormReviewed  bit,
ADD IDGFormIssues  bit,