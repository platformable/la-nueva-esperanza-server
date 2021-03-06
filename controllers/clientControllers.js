const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

const buffer = require('buffer/').Buffer;
const fetch = require('node-fetch');
const { URLSearchParams } = require('node:url');


const createFolder = require('./createFolder')
///
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




/* const getIdAndFolderIntakeForm = async (clientID,folderName)=>{
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'intake',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderAP = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'action_plans',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderConsent = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'consent',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderMedical = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'medical',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */


/* const getIdAndFolderCBRA = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'cbra',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderLinkage = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'linkage_navigation',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderMiscellaneous = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'miscellaneous',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderTicklerUpdates = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'tickler_updates',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderSupportGroups = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'support_groups',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const getIdAndFolderIdg = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
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
      const sendToDb = await addClientFolder(folderUrl,'idg',clientID)
    }
    catch(e) {
      console.log(e)
    }
} */




/* const createFoldersAfterUserRegistration = async (clientID) => {

  try {

 const getData= axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_batch`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      force_async: false,
      paths:[`/clients/${clientID}`,
      `/clients/${clientID}/${clientID}_INTAKE`,
      `/clients/${clientID}/${clientID}_CBRA`,
      `/clients/${clientID}/${clientID}_ACTION_PLANS`,
      `/clients/${clientID}/${clientID}_MISCELLANEOUS`,
      `/clients/${clientID}/${clientID}_MEDICAL`,
      `/clients/${clientID}/${clientID}_CONSENT`,
      `/clients/${clientID}/${clientID}_LINKAGE_NAVIGATION`,
      `/clients/${clientID}/${clientID}_TICKLER_UPDATES`,
      `/clients/${clientID}/${clientID}_SUPPORT_GROUPS`,
      `/clients/${clientID}/${clientID}_IDG`
    ]
    },
  })
  const dataResponse = await getData 
  console.log("dataResponse.statusText",dataResponse.statusText)
  //const dataStatus = await dataResponse.statusText==='OK' ? ()=> {setTimeout(createClientSharedMainFolder(clientID,'intake'),5000)}: console.log("create folder error",dataResponse.status)
const dataStatus = await dataResponse.statusText==='OK' ? createClientSharedMainFolder(clientID,'intake'): console.log("create folder error",dataResponse.status)

  } catch(e){
console.log("an error ocurred createClientfolders", e)
  }
}; */


const createClientSharedMainFolder = async (clientID,folderName)=>{
console.log("creating",folderName)
  try {
  const getData= await axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_${folderName.toUpperCase()}`,
      "shared_link_policy": "anyone"
  }
  })
  const dataResponse = await getData 
  const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(dataResponse.data.preview_url,folderName,clientID): createClientSharedMainFolder(clientID,folderName)
  }  catch(e){
    console.log("an error ocurred sharing ", e)
      }

}


/* const createClientIntakeFormSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_INTAKE_FORM`,
      "shared_link_policy": "anyone"
  }
  })
   .then((resx)=>setTimeout(()=>{createClientCbraSharedFolder(clientID)},10000))
   .then(res=>setTimeout(()=>{getIdAndFolderIntakeForm(clientID,'INTAKE_FORM')},15000))
   .catch((error)=>console.log(error))
} */

/* const createClientCbraSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_CBRA`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resaction) => {
    setTimeout(()=>{createClientActionPlansSharedFolder(clientID)},10000)
  })
  .then(response=>setTimeout(()=>{getIdAndFolderCBRA(clientID,'CBRA')},15000))
  .catch((error)=>console.log(error))
 
} */

/* const createClientActionPlansSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_ACTION_PLANS`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resmiscellaneous) => {setTimeout(()=>{createClientMiscellaneousSharedFolder(clientID)},10000)})
  .then(res=>setTimeout(()=>{getIdAndFolderAP(clientID,'ACTION_PLANS')},15000))
  .catch((error)=>console.log(error))
} */



/* const createClientConsentSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_CONSENT`,
      "shared_link_policy": "anyone"
  }
  })
  .then((reslinkage) => setTimeout(()=>{createClientLinkageNavigationSharedFolder(clientID)},10000))
  .then(res=>setTimeout(()=>{getIdAndFolderConsent(clientID,'CONSENT')},15000))
  .catch((error)=>console.log(error))
} */

/* const createClientMiscellaneousSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_MISCELLANEOUS`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resmedical) => {setTimeout(()=>{createClientMedicalSharedFolder(clientID)},10000)})
  .then(response=>setTimeout(()=>{getIdAndFolderMiscellaneous(clientID,'MISCELLANEOUS')},15000))
  .catch((error)=>console.log(error))
} */

/* const createClientLinkageNavigationSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_LINKAGE_NAVIGATION`,
      "shared_link_policy": "anyone"
  }
  })
  .then((reslinkage) => {setTimeout(()=>{createClientTicklerUpdatesSharedFolder(clientID)},10000)})
  .then(res=>setTimeout(()=>{getIdAndFolderLinkage(clientID,'LINKAGE_NAVIGATION')},15000))
  .catch((error)=>console.log(error))
} */

/* const createClientTicklerUpdatesSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_TICKLER_UPDATES`,
      "shared_link_policy": "anyone" 
  }
  })
  .then((reslinkage) => {setTimeout(()=>{createClientSupportGroupsSharedFolder(clientID)},10000)})
  .then(res=>setTimeout(()=>{getIdAndFolderTicklerUpdates(clientID,'TICKLER_UPDATES')},15000))
  .catch((error)=>console.log(error))
} */

/* const createClientSupportGroupsSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_SUPPORT_GROUPS`,
      "shared_link_policy": "anyone"
  }
  })
  .then((reslinkage) => {setTimeout(()=>{createClientIdgSharedFolder(clientID)},20000)})
  .then(res=>setTimeout(()=>{getIdAndFolderSupportGroups(clientID,'SUPPORT_GROUPS')},25000))
  .catch((error)=>console.log(error))
} */

/* const createClientIdgSharedFolder=(clientID)=>{
  console.log("running IDG")
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_IDG`,
      "shared_link_policy": "anyone"
  }
  })
  .then(res=>setTimeout(()=>{getIdAndFolderIdg(clientID,'IDG')},10000))
  .catch((error)=>console.log(error))
} */

/* const createClientMedicalSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_MEDICAL`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resconsent) => setTimeout(()=>{createClientConsentSharedFolder(clientID)},10000))
  .then(res=>setTimeout(()=>{getIdAndFolderMedical(clientID,'MEDICAL')},15000))
  .catch((error)=>console.log(error))
} */

module.exports = {
  getClientById: async (req, res) => {
    let { clientid } = await req.params;
    console.log("clientid",clientid)
    const query = {
      text: "select * from clients where clientid=$1",
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }
  },
  getClients: async (req, res) => {
    try {
      const allData = await db.query("select * from clients");
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  getClientProfileData: async (req,res)=>{
    let {clientid} = req.params

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
      const query = {
      text: `
      select clients.clientid,
      clients.clientfirstname ,
      clients.clientlastname ,
      clients.clienthcwid ,
      clients.clienthcwname ,
      clients.clienthcwlastname ,
      clients.clientdatecreated ,
      msa_form.clientid as msaClientId, 
      msa_form.id as msaFormID,
      msa_form.airsintakeform as msaFormAIRSINTAKEFORM,
      msa_form.comprehensiveriskbehaviorassessment as msaformcomprehensiveriskbehavrioassesment,
      msa_form.hnseligibilityform as msahnselegibilityform,
      msa_form.hnsreadinessform as msaformhnsreadinessform,
      services_action_plan.clientid as servicesactionplanid,
      services_action_plan.goal1completed ,
      services_action_plan.goal2completed ,
      services_action_plan.goal3completed,
      services_action_plan.goal1completiondate  ,
      services_action_plan.goal2completiondate ,
      services_action_plan.goal3completiondate,
      services_action_plan.planstartdate,
      progress_note.id as progress_note_id,
      progress_note.progressnotedate as progressnotedate  
      from clients 
      full outer join msa_form on clients.clientid=msa_form.clientid 
      full outer join services_action_plan on clients.clientid = services_action_plan.clientid
      full outer join progress_note on clients.clientid = progress_note.clientid 
      where clients.clientid=$1`,
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }


/*    try {

    checkIfClientHasMSAForm()
   }
   catch(e) {
      console.log(e)
      res.json({"message":"an error ocurred"})
   } */
  },
  createClient: async (req, res) => {
    let {
      clientFirstName,
      clientLastName,
      clientSSN,
      clientActive,
      clientHCWID,
      clientHCWName,
      clientHCWLastname,
      clientID,
      clientDateCreated,
      clientHCWemail,
      clientCategory
    } = req.body;

    const nameCapitalized =
      clientFirstName.charAt(0).toUpperCase().trim() + clientFirstName.slice(1).trim();
    const lastnameCapitalized =
      clientLastName.charAt(0).toUpperCase() + clientLastName.slice(1);

    if ((clientActive = "true")) {
      clientActive = "1";
    } else {
      clientActive = "0";
    }
    checkSSN(clientID);
    function checkSSN(clientID) {
      const query1 = {
        text: "select * from clients where clientid=$1",
        values: [clientID],
      };

      db.query(query1)
        .then((data) => {
          if (data.rows.length > 0) {
            res.status(409).send("Client is already registered");
          } else {
            const query = {
              text: "INSERT INTO clients(clientfirstname,clientlastname,clientssn,clientactive,clienthcwid,clienthcwname,clienthcwlastname,clientid,clientdatecreated,clienthcwemail,clientcategory) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
              values: [
                nameCapitalized,
                lastnameCapitalized,
                clientSSN,
                clientActive,
                clientHCWID,
                clientHCWName,
                clientHCWLastname,
                clientID,
                clientDateCreated,
                clientHCWemail,
                clientCategory
              ],
            };
          
            db.query(query)
              .then((data) => res.status(200).json(data.rows[0]))
              .then(newresponse =>connectDropboxAndCreateFolders(DBXCLIENT_ID,clientID))
     /*          .then((response1) => createClientSharedMainFolder(clientID,'intake'))
              .then((response2) => createClientSharedMainFolder(clientID,'cbra'))
              .then((response3) => createClientSharedMainFolder(clientID,'action_plans'))
              .then((response4) => createClientSharedMainFolder(clientID,'consent'))
              .then((response5) => createClientSharedMainFolder(clientID,'idg'))
              .then((response6) => createClientSharedMainFolder(clientID,'linkage_navigation'))
              .then((response7) => createClientSharedMainFolder(clientID,'medical'))
              .then((response8) => createClientSharedMainFolder(clientID,'miscellaneous'))
              .then((response9) => createClientSharedMainFolder(clientID,'support_groups'))
              .then((response10) => createClientSharedMainFolder(clientID,'tickler_updates')) */
           /*    .then((response1) => setTimeout(createClientSharedMainFolder(clientID,'intake')),1000)
              .then((response2) => setTimeout(createClientSharedMainFolder(clientID,'cbra')),10000)
              .then((response3) => setTimeout(createClientSharedMainFolder(clientID,'action_plans')),15000)
              .then((response4) => setTimeout(createClientSharedMainFolder(clientID,'consent')),20000)
              .then((response5) => setTimeout(createClientSharedMainFolder(clientID,'idg')),25000)
              .then((response6) => setTimeout(createClientSharedMainFolder(clientID,'linkage_navigation')),30000)
              .then((response7) => setTimeout(createClientSharedMainFolder(clientID,'medical')),35000)
              .then((response8) => setTimeout(createClientSharedMainFolder(clientID,'miscellaneous')),40000)
              .then((response9) => setTimeout(createClientSharedMainFolder(clientID,'support_groups')),45000)
              .then((response10) => setTimeout(createClientSharedMainFolder(clientID,'tickler_updates')),50000) */
              .catch((e) => console.error(e.stack))
          }
        })
        .catch((e) => console.log(e));
    }
  },
};


const connectDropboxAndCreateFolders=(DBXCLIENT_ID,clientID)=>{
  console.log("DBXCLIENT_ID",DBXCLIENT_ID)
  console.log("clientID",clientID)

  //GENERATE CODE FROM CLIENTID AND CLIENTSECRET TO BE USED TO REQUEST THE ACCESSTOKEN FROM REFRESH 
const clientIdSecretEncoded = buffer.from(`${DBXCLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
console.log("clientIdSecretEncoded",clientIdSecretEncoded)

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);
  console.log("urlencoded",urlencoded)
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
        console.log("accessTokenResult",accessTokenResult)
          tokenFromRefresh = accessTokenResult.access_token // ADDING TO tokenFromRefresh (GLOBAL VARIABLE) THE ACCESS TOKEN THANKS TO REFRESH
          console.log("tokenfrom",tokenFromRefresh)
          createFolders(tokenFromRefresh, clientID)
      })
      .then(result => console.log(result))
      .catch(error => console.log('error from connectDropboxAndCreateFolders', error))
}


//>>> FUNCTION THAT CREATE EACH FOLDER : crear cada carpeta  <<<<<< 
const createFolders =  async (token, CLIENT_ID) => {
  console.log("desde createFolrder token clientID",token,CLIENT_ID)
  // In the CreateFolder file (at the end), it is the function that, I believe, makes the update in the database  
 //await createFolder.createFolderIntake(token, CLIENT_ID)
 await createFolder.createFolderIntakeForm(token, CLIENT_ID)
 await createFolder.createFolderCBRA(token, CLIENT_ID)
 await createFolder.createFolderMiscellaneous(token, CLIENT_ID)
 await createFolder.createFolderMedical(token, CLIENT_ID)
 await createFolder.createFolderActionPlans(token, CLIENT_ID)
 await createFolder.createFolderConsent(token, CLIENT_ID)
 await createFolder.createFolderLinkageNavigation(token, CLIENT_ID)
 await createFolder.createFolderTicklerUpdates(token, CLIENT_ID)
 await createFolder.createFolderSupportGroups(token, CLIENT_ID)
 await createFolder.createFolderIDG(token, CLIENT_ID)

}

/* const getIdAndFolderUrl = async (clientID,folderName)=>{
  try {
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
      const sendToDb = await addClientFolder(folderUrl,folderName,clientID)
    }
    catch(e) {
      console.log(e)
    }
} */

/* const addClientFolder = async (url,folderName,clientID) =>{
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
    } */