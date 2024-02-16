const db = require("../dbConnect");

module.exports = {
  getUsers: async (req, res) => {
    console.log("users")
    try {
      const allData = await db.query("select * from users");
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  createUser: async (req, res) => {
    const {user_id, name, lastname, userrole, email, dateaccountactivated,useractivestatus } = req.body;
  
    const text =
      "INSERT INTO users(user_id,name,lastname,userrole,useremail,dateaccountactivated,useractivestatus) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [user_id,name, lastname, userrole, email, dateaccountactivated,useractivestatus];
    // callback
    db.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  },
  delete: async (req, res) => {
    const { user_id } = req.body;
    console.log(req.body)
    console.log("delete user_id",user_id)
    const query = {
      text: "DELETE from users where user_id=$1",
      values: [user_id],
    };
    // promise
    db.query(query)
      .then((data) => {
   console.log("delete user")
          res.send({
            status: "OK",
            message: "User deleted",
          });
     
      })
      .catch((e) => console.error(e.stack));
  },
  updateLastLogin: async (req, res) => {
    const { datelastlogin, useremail } = req.body;
    try {
      const query = await {
        name: "update-last-login",
        text: `update users set datelastlogin=$1 where useremail=$2`,
        values: [datelastlogin, useremail],
      };
      db
        .query(query)
        .then((response) =>
          res.json({
            data: response.rowCount,
            status: 200,
          })
        )
        .catch((e) => res.send(e.stack));
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },
  updateUser: async (req, res) => {
    let { name,lastname,userrole,useremail,useractivestatus,id} = req.body;
    console.log("res.body",req.body)

 /*    if(useractivestatus==="true"){
      useractivestatus="Active"
    } else {
      useractivestatus="No Active"
    } */

    try {
      const query = await {
   /*      name: "update-user", */
        text: `update users set name=$1,lastname=$2,userrole=$3,useremail=$4 ,useractivestatus =$5 where id=$6`,
        values: [name,lastname,userrole,useremail,useractivestatus,id],
      };
      db
        .query(query)
        .then((response) =>
          res.json({
            data: response.rowCount,
            status: 200,
          })
        )
        .catch((e) => {console.log("errror",e)
          res.send(e.stack)});
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },

};
