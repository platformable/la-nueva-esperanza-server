const axios = require("axios")
const db = require("../dbConnect");


exports.createFolderIntake = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_INTAKE`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);
        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,data.folderName,clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}

exports.createFolderIntakeForm = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_INTAKE_FORM`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'INTAKE',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderCBRA = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_CBRA`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'CBRA',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderMiscellaneous = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_MISCELLANEOUS`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'MISCELLANEOUS',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderMedical = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_MEDICAL`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'MEDICAL',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderActionPlans = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_ACTION_PLANS`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'ACTION_PLANS',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}

exports.createFolderConsent = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_CONSENT`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'CONSENT',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderLinkageNavigation = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_LINKAGE_NAVIGATION`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'LINKAGE_NAVIGATION',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderTicklerUpdates = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_TICKLER_UPDATES`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'TICKLER_UPDATES',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderSupportGroups = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_SUPPORT_GROUPS`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'SUPPORT_GROUPS',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)
   
    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}
exports.createFolderIDG = async (token, clientId) => {
    try {
        const getData = axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/2/sharing/share_folder',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: {
                "access_inheritance": "inherit",
                "acl_update_policy": "editors",
                "force_async": false,
                "member_policy": "anyone",
                "path": `/clients/${clientId}/${clientId}_IDG`,
                "shared_link_policy": "anyone"
            }
        })

        const dataResponse = await getData;
        console.log(">>>FOLDER<<<<");
        console.log('dataResponse.data.name: ', dataResponse.data.name);
        console.log("dataResponse.data.path_lower", dataResponse.data.path_lower);
        console.log('dataResponse.data.shared_folder_id: ', dataResponse.data.shared_folder_id);
        console.log('dataResponse.data.preview_url: ', dataResponse.data.preview_url);

        const data =  {
            url : dataResponse.data.preview_url,
            folderName: dataResponse.data.name ,
        }
        const dataStatus = await dataResponse.statusText==='OK' && addClientFolder(data.url,'IDG',clientId)
        // const dataStatus = await dataResponse.statusText==='OK' ? addClientFolder(data.url,data.folderName,clientId): createClientSharedMainFolder(clientId,data.folderName)

    } catch (e) {
        console.log("an error ocurred sharing ", e)
    }
}

const addClientFolder = async (url, folderName, clientID) => {
    console.log("url en addClientFolder", url)
    console.log("folder en addClientFolder", folderName)
    console.log("id en addClientFolder", clientID)
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

exports.connectDropbox=async ()=>{
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
    try {
      const res= fetch("https://api.dropbox.com/oauth2/token", requestOptions)
      const response = await res
      const response1 = await response.json()
      console.log("response1",response1)
      const accessTokenResult = await response1.access_token
      tokenFromRefresh =  accessTokenResult
      console.log("tokenFromRefresh",tokenFromRefresh)
      return tokenFromRefresh

     }
      catch{
          (error => console.log('error from connectDropboxA', error))}

    }