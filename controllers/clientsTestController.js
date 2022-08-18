const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");


var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

module.exports = {
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
          clientDateCreated
        } = req.body;
    
        const nameCapitalized =
          clientFirstName.charAt(0).toUpperCase().trim() + clientFirstName.slice(1).trim();
        const lastnameCapitalized =
          clientLastName.charAt(0).toUpperCase() + clientLastName.slice(1);
    
        if ((clientActive === "true")) {
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
                  text: "INSERT INTO clients(clientfirstname,clientlastname,clientssn,clientactive,clienthcwid,clienthcwname,clienthcwlastname,clientid,clientdatecreated) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
                  values: [
                    nameCapitalized,
                    lastnameCapitalized,
                    clientSSN,
                    clientActive,
                    clientHCWID,
                    clientHCWName,
                    clientHCWLastname,
                    clientID,
                    clientDateCreated
                  ],
                };
              
                db.query(query)
                  .then((data) => res.status(200).json(data.rows[0]))
                  .then((response) => createFoldersAfterUserRegistration(clientID))
                  .then((resmain) => {setTimeout(()=>{createClientSharedMainFolder(clientID)},5000)})
                  .catch((e) => console.error(e.stack))
              }
            })
            .catch((e) => console.log(e));
        }
      },
}

const createFoldersAfterUserRegistration = (clientID) => {

    try {
   const createAllFolders = axios({
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
        `/clients/${clientID}/${clientID}_INTAKE_FORM`,
        `/clients/${clientID}/${clientID}_CBRA`,
        `/clients/${clientID}/${clientID}_ACTION_PLANS`,
        `/clients/${clientID}/${clientID}_MISCELLANEOUS`,
        `/clients/${clientID}/${clientID}_MEDICAL`,
        `/clients/${clientID}/${clientID}_CONSENT`,
        `/clients/${clientID}/${clientID}_LINKAGE_NAVIGATION`]
        
      },
    })
    const createAllFoldersResult = await console.log(createAllFolders);

} catch(error) {
        console.log(error);
      };
  };