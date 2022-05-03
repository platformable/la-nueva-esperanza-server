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