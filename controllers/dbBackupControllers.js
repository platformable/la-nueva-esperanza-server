const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

const {execute} = require('@getvim/execute')
const dotenv=require('dotenv')
const cron = require('node-cron')
const fs = require('fs');

const buffer = require('buffer/').Buffer;
const fetch = require('node-fetch');
const { URLSearchParams } = require('node:url');


const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `lne-db-backup-${currentDate}.sql`;

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
//var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
let tokenFromRefresh; // THIS VARIABLE WILL STORE THE ACCESS_TOKEN GIVEN FROM THE REFRESH



const DBXCLIENT_ID = process.env.DBX_CLIENT_ID;
const CLIENT_SECRET = process.env.DBX_CLIENT_SECRET;

const config = {
    clientId: DBXCLIENT_ID,
    clientSecret: CLIENT_SECRET,
};
const dbx = new Dropbox(config);

////

const headerDataForUpload={
	"autorename": false,
	"mode": "add",
	"mute": false,
	"path": `/LNE-Backups/${fileName}`,
	"strict_conflict": false,
}

const connectDropboxAndCreateFolders=(DBXCLIENT_ID,res)=>{

    //GENERATE CODE FROM CLIENTID AND CLIENTSECRET TO BE USED TO REQUEST THE ACCESSTOKEN FROM REFRESH 
  const clientIdSecretEncoded = buffer.from(`${DBXCLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);

    const requestOptions = {
       method: 'POST',
        headers: {
            "Authorization": `Basic ${clientIdSecretEncoded}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencoded,
        redirect: 'follow'
    };
    fetch("https://api.dropbox.com/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(result => newAccessToken = result)
        .then(accessTokenResult => {
            tokenFromRefresh = accessTokenResult.access_token // ADDING TO tokenFromRefresh (GLOBAL VARIABLE) THE ACCESS TOKEN THANKS TO REFRESHgit push
            console.log("tokenfrom",tokenFromRefresh)
        })
        .catch(error => console.log('error from connectDropboxAndCreateFolders', error))
  }


  function backup(res) {
	
	
	execute(`PGPASSWORD="${process.env.DATABASEPASSWORD}" pg_dump -U ${process.env.DATABASEUSERNAME} -d ${process.env.DATABASENAME} -h ${process.env.DATABASEHOST} -p ${process.env.DATABASEPORT} > ${fileName}`)

	.then(async (response) => {

//		res.send("yes")
uploadDbBackupToDropbox(res)
	}).catch(err => {
		res.json({message:"an error courred",error:err})
		console.log("error",err);
	})
}


const  uploadDbBackupToDropbox = async (res)=>{

	/* const form = new FormData();
    form.append('file', fileName); */
	const fileToUpload = fs.readFileSync(fileName);
	axios({
		method: 'post',
		url: 'https://content.dropboxapi.com/2/files/upload',
		headers: {
			"authorization": `Bearer ${tokenFromRefresh}`,
			"Content-Type":"application/octet-stream",
			'Dropbox-API-Arg': JSON.stringify(headerDataForUpload)},
		data:fileToUpload
	  })
	  .then(response=>{
        fs.unlinkSync(fileName)
		console.log(response)
		res.status(200).json({
		message:"File Uploaded success",
		status:'OK',
        file_name:response.data.name,
        path_display:response.data.path_display,
        file_id:response.data.id,
        access_token:tokenFromRefresh

	  })})
	  .catch(error=>{
		res.status(400).json({message:"error"})	
		console.log(error)
	})
    
}



module.exports = {

    createBackupFromClientSide: async (req,res)=>{
        connectDropboxAndCreateFolders(DBXCLIENT_ID,res)
        backup(res)
    },
    autoBackup:async(req,res)=>{

        console.log("starting backup")
        cron.schedule('0 13 * * *', () => {
        console.log('running a task every day at 1pm europe');
        connectDropboxAndCreateFolders(DBXCLIENT_ID,res)
        backup(res)
        },
        {
            scheduled:true,
            timezone:'Europe/Madrid'
        });
    }

}