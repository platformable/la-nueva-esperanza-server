const db = require('../dbConnect')

module.exports = {
    get : async (req,res)=>{
        try {
            const allData = await db.query('select * from authorizedUsers')
            const response = allData.rows 
              res.send(response)
            }
            catch (e) {
              console.log(e)
              res.send("an error ocurred")
            }
    },
    post: async (req,res)=>{
        let {name,lastname,role,email,isactive} = req.body
/*         if(isactive===true){
          isactive=1
        } else {
          isactive=0
        } */
        const dateaccountactivated = new Date()
        const query = {
          text: 'INSERT INTO authorizedusers (name,lastname,role,email,isactive,dateaccountactivated) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
          values: [name,lastname,role,email,isactive,dateaccountactivated],
        }
        // promise
        db
          .query(query)
          .then(data => res.status(200).json(data.rows[0]))
          .catch(e => console.error(e.stack))
    },
    updateUser: async (req, res) => {
        const {id,name,lastname,role,email,isactive} = req.body;
        console.log("req.body")
        try {
          const query = await {
            name: "update-user",
            text: `update authorizedusers set id=$1, name=$2, lastname=$3, role=$4, email=$5, isactive=$6 where id=$1`,
            values: [id,name,lastname,role,email,isactive],
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
    delete: async (req,res) =>{
        console.log("delete route")
        console.log("req.body:", req)
        const {id} = req.body
        console.log("id: ", id)
        const query = {
            text: 'DELETE from authorizedusers where id=$1',
            values: [id],
          }
          // promise
          db
            .query(query)
            .then(data => {
                if(data.rowCount=1){
                    res.send({
                        status:"OK",
                        response:"User deleted"
                    })
                } else {
                    res.send({
                        status:"FAIL",
                        response:"An error ocurred"
                    })
                }
            })
            .catch(e => console.error(e.stack))
    }
}