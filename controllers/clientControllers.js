const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

const clientFolders = [
  {
    name: "folder1",
  },
  {
    name: "folder2",
  },
  {
    name: "folder3",
  },
  {
    name: "folder4",
  },
  {
    name: "folder5",
  },
  {
    name: "folder6",
  },
  {
    name: "folder1",
  },
];

const createFoldersAfterUserRegistration = (clientID) => {
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const createClientSubfolder1AfterUserRegistration = (clientID) => {
  console.log("subfolde 1");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder1`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .then((createClientSubfolder2) =>
      setTimeout(() => {
        createClientSubfolder2AfterUserRegistration(clientID);
      }, 3000)
    )
    .catch(function (error) {
      console.log(error);
    });
};
const createClientSubfolder2AfterUserRegistration = (clientID) => {
  console.log("subfolde 2");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder2`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .then((createClientSubfolder3) =>
      setTimeout(() => {
        createClientSubfolder3AfterUserRegistration(clientID);
      }, 3000)
    )
    .catch(function (error) {
      console.log(error);
    });
};

const createClientSubfolder3AfterUserRegistration = (clientID) => {
  console.log("subfolde 3");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder3`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .then((createClientSubfolder4) =>
      setTimeout(() => {
        createClientSubfolder4AfterUserRegistration(clientID);
      }, 3000)
    )
    .catch(function (error) {
      console.log(error);
    });
};

const createClientSubfolder4AfterUserRegistration = (clientID) => {
  console.log("subfolde 4");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder4`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .then((createClientSubfolder5) =>
      setTimeout(() => {
        createClientSubfolder5AfterUserRegistration(clientID);
      }, 3000)
    )
    .catch(function (error) {
      console.log(error);
    });
};

const createClientSubfolder5AfterUserRegistration = (clientID) => {
  console.log("subfolde 5");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder5`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .then((createClientSubfolder6) =>
      setTimeout(() => {
        createClientSubfolder6AfterUserRegistration(clientID);
      }, 3000)
    )
    .catch(function (error) {
      console.log(error);
    });
};

const createClientSubfolder6AfterUserRegistration = (clientID) => {
  console.log("subfolde 6");
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      path: `/${clientID}/subfolder6`,
    },
  })
    .then(function (response) {
      console.log("dropbox response:", response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

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
    //check if there is a msa form
    const checkIfClientHasMSAForm = async ()=>{

      const checkIfMsaFormQuery = {
        text:"select clients.clientfirstname ,clients.clientlastname, clients.clientid,clients.clienthcwname,clients.clienthcwlastname,clients.clientdatecreated, msa_form.airsintakeform, msa_form.comprehensiveriskbehaviorassessment,msa_form.serviceactionplan ,msa_form.id as msa_form_id  from clients inner join msa_form  on clients.clientid = msa_form.clientid  where clients.clientid=$1",
        values:[clientid]
      }
      db.query(checkIfMsaFormQuery)
      .then(response=>{
        if(response.rows.length>0){
         res.status(200).send([response.rows[0]])
        } else {
          getClientById()
        }
      })
      .catch(err=>console.log(err))
    }

    const getClientById = async () =>{
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
    }

   try {

    checkIfClientHasMSAForm()
   }
   catch(e) {
      console.log(e)
      res.json({"message":"an error ocurred"})
   }
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
      clientDateCreated
    } = req.body;

    const nameCapitalized =
      clientFirstName.charAt(0).toUpperCase() + clientFirstName.slice(1);
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
              .then((createClientFolder) =>
                createFoldersAfterUserRegistration(clientID)
              )
              .then((createClientSubfolder1) =>
                setTimeout(() => {
                  createClientSubfolder1AfterUserRegistration(clientID);
                }, 4000)
              )
              .catch((e) => console.error(e.stack));
          }
        })
        .catch((e) => console.log(e));
    }
  },
};
