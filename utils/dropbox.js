
const { urlencoded } = require('express')
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json());
app.use(urlencoded({extended:false}))
const fetch = require('node-fetch');
const { URLSearchParams } = require('node:url');
const buffer = require('buffer/').Buffer;
require('dotenv').config()
const port = process.env.PORT || 4500
const key=process.env.KEY
let tokenFromRefresh;
const db = require("../dbConnect");

const fs = require('fs');
const {Blob} =require ('buffer');





exports.connectToDropbox = async () => {
    console.log("connecting dropbox")
    const clientIdSecretEncoded = buffer
      .from(`${process.env.DBX_CLIENT_ID}:${process.env.DBX_CLIENT_SECRET}`)
      .toString("base64");
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Basic ${clientIdSecretEncoded}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
      redirect: "follow",
    };
    try {
       
      const res = fetch("https://api.dropbox.com/oauth2/token", requestOptions);
      const response = await res;
      const response1 = await response.json();
      const accessTokenResult = await response1.access_token;
      tokenFromRefresh = await accessTokenResult;
      //console.log("TFR desde connet to db",tokenFromRefresh)
      return tokenFromRefresh;
    } catch {
      (error) => console.log("error from connectDropboxAndCreateFolders", error);
    }
  };
  
  exports.createAllFolders = async (clientID) => {

    try {
      const getData = axios({
        method: "post",
        url: "https://api.dropboxapi.com/2/files/create_folder_batch",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenFromRefresh}`,
        },
        data: {
          autorename: false,
          force_async: false,
          paths: [
            `/clients/${clientID}/ACTION_PLANS`,
            `/clients/${clientID}/CBRA`,
            `/clients/${clientID}/CONSENT`,
            `/clients/${clientID}/IDG`,
            `/clients/${clientID}/INTAKE`,
            `/clients/${clientID}/LINKAGE_NAVIGATION`,
            `/clients/${clientID}/MEDICAL`,
            `/clients/${clientID}/MISCELLANEOUS`,
            `/clients/${clientID}/SUPPORT_GROUPS`,
            `/clients/${clientID}/TICKLER_UPDATES`,
          ],
        },
      });
  
      const dataResponse = await getData;
  
      console.log("dataResponse all folders", dataResponse.status);
    } catch (e) {
      console.log("an error ocurred sharing ", e);
    }
  };

  exports.shareFolder = async (clientID,folder) => {
    console.log("folder name",folder)
    console.log("tokenFromRefresh",tokenFromRefresh + ' ' + folder )
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenFromRefresh}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientID}/${folder}`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        //console.log(dataResponse)
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data: ', dataResponse.data);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);
        const data = await {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const addData = await this.addClientFolder(data.url,data.folderName,clientID)
        return addData
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}

exports.addClientFolder = async (url,folderName,clientID) =>{
    console.log("url desde add client",url)
    console.log("folder desde add client",folderName)
    console.log("id desde add client",clientID)
          try {
            const query = await {
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
}