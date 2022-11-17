require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
var cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors())
app.use(urlencoded({extended:false}))
const port = process.env.PORT || 5500
const axios = require('axios')
const db = require("./dbConnect");
const { Pool,Client } = require('pg')
//const { user } = require('pg/lib/defaults')
const cron = require('node-cron')
let nodemailer = require("nodemailer");
const  autoBackup = require('./controllers/dbBackupControllers')



const client = new Client(
  {
      user:process.env.DBUSER,
      host:process.env.HOST,
      database:process.env.DATABASE,
      password:process.env.PASSWORD,
      port: process.env.DB_PORT,
      //ssl:true
      ssl:{ rejectUnauthorized: false }
    }
)
client.connect()


const authorizedUserRoute = require('./routes/authuser')
app.use('/authorizedusers', authorizedUserRoute)

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)

const clientsRoute = require('./routes/clients')
app.use('/clients', clientsRoute)

const servicesActionPlanRoute = require('./routes/servicesActionPlan')
app.use('/services_action_plan', servicesActionPlanRoute)

const msaFormRoute = require('./routes/msaForm')
app.use('/msa_forms', msaFormRoute)

const progressNotes = require('./routes/progressNotes')
app.use('/progress_notes',progressNotes)

const manageServices = require('./routes/manageServices')
app.use('/manage_services',manageServices)

const monitorFunding = require('./routes/monitorFunding')
app.use('/monitor_funding',monitorFunding)

const dbBackup = require('./routes/dbBackup')
app.use('/backup',dbBackup)

const accessToken = require('./routes/dropboxAccessToken')
app.use('/access_token',accessToken)

const impactBaseline = require('./routes/impactBaseline')
app.use('/impact_baseline',impactBaseline)

const impactTracker = require('./routes/impactTracker')
app.use('/impact_tracker',impactTracker)

const issues = require('./routes/issues')
app.use('/issues',issues)

const suppliesDistributed = require('./routes/suppliesDistributed')
app.use('/supplies_distributed',suppliesDistributed)

const supportGroups = require('./routes/supportGroups')
app.use('/support_groups',supportGroups)





var task = cron.schedule('0 11 * * *', () =>  {
  console.log('running a task every day at 23 europe');
  autoBackup.createBackupFromClientSide()
}, {
  scheduled: false,
  timezone:'Europe/Madrid'
});

task.start();


/* app.get("/test", async (req,res)=>{
  var clientID = 'g1234e'
  var folderName="cbra"
  let sharedFolderId;

  try {

  let founded;
  const getFolderId = await axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/get_metadata`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
    },
    data: {  
        "include_deleted": false,
        "include_has_explicit_shared_members": false,
        "include_media_info": false,
        "path": `/clients/${clientID}/${clientID}_${folderName}`
    },
  })
  const getFolderIdResponse = await getFolderId
  const folderID=  getFolderIdResponse.data.shared_folder_id

 

   const getUrl= await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {
      "shared_folder_id":folderID
      },
    })
    const getFolderUrlResponse = await getUrl
    const folderUrl=  await getFolderUrlResponse.data.preview_url
    const resultUrl= await res.send(folderUrl)
    console.log(folderUrl)

    const sendToDb = await addClientFolder(folderUrl,"cbra",clientID)
  }
  catch(e) {
    console.log(e)
  }

}) */


/* const addClientFolder = async (url,folderName,clientID) =>{
      try {
        const query = await {
          name: "update-last-login",
          text: `update clients set ${folderName}_folder_url=$1 where clientid=$2`,
          values: [url, clientID.toUpperCase()],
        };
        db
          .query(query)
          .then((response) => console.log("update client sucess",response.rowCount))
          .catch((e) => console.log(e));
      } catch (error) {
        console.log("error message de addClientFolder:", error);
      }
  } */


/* app.get("/mail", (req,res)=>{

  let mailTrasporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:"alexei@platformable.com",
      pass:process.env.EMAILPASSWORD
    }
  })

  let details = {
    from:"accounts@platformable.com",
    to:"garban.valdeon@gmail.com",
    subject:"hello from nodemailer test",
    text:"this is the content of first test of nodemailer"
  }

  mailTrasporter.sendMail(details,(err)=>{
    
    if(err){
      console.log(err)
    } else {
      console.log("email sent")
    }
  })
}) */

/* app.get("/testurl",(req,res)=>{
  let sharedFolderUrl;
  var clientID = 'g1234e'
  var folderName="intake_form"
  var sharedFolderId="2637785713"
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
    },
    data: {
    "shared_folder_id":sharedFolderId
    },
  })
    .then(response => {sharedFolderUrl=response.data.preview_url})
    .then(resx=>res.send(sharedFolderUrl))
    .catch((error)=> { console.log(error)})
}) 

app.get("/date", (req,res)=>{
  db.query("select msa_form.airsfinancialinformationdate from msa_form where clientfirstname ='Rosa'")
  .then(response=>res.send(response.rows[0]))
  .catch((error)=> { console.log(error)})
}) */

/* PORT */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


