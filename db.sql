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