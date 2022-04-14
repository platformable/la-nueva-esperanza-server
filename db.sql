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