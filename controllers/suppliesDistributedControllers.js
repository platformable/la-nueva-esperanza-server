const db = require('../dbConnect')


module.exports= {
    getAll: async (req,res)=>{
        const query = {text:'select id, date from supplies_distributed order by "date" desc'}

        try {
          const allData = await db.query(query);
                const response = allData.rows;
              /*   console.log("response", response); */
                console.log("response length", allData.rows);
                res.send(response);
          
        } catch (error) {
          console.log(error)
          res.send({errorMessage:error})
        }
    }, 
    getAllForReports: async (req,res)=>{
      const {startDate,endDate} = req.params
      const query = {text:`select * from supplies_distributed where date between '${startDate}' and '${endDate}' order by "date" desc` }

      try {
        const allData = await db.query(query);
              const response = allData.rows;
            /*   console.log("response", response); */
              console.log("response length", allData.rows);
              res.send(response);
        
      } catch (error) {
        console.log(error)
        res.send({errorMessage:error})
      }
  }, 
    createNew: async (req,res)=> {
        console.log("req.body",req.body)

        try {
    
             let {
                date,
                kitsDistributed,
                extCondomsDistributed,
                intCondomsDistributed,
                oralCondomsDistributed,
                lubesDistributed,
                dentalDamsDistributed,
                fingerCotsDistributed,
                Men,
                Women,
                TransMen,
                TransWomen,
                GenderNotSpecified,
                Hispanic,
                AfricanAmerican,
                Caucasian,
                Asian,
                RaceEthnicityNotSpecified,
                Aged19_24,
                Aged25_35,
                Aged35_44,
                Aged45,
                AgeNotSpecified
            } = req.body
    

            const query ={
                text:`
                insert into supplies_distributed(
                    date,
                    kitsDistributed,
                    extCondomsDistributed,
                    intCondomsDistributed,
                    oralCondomsDistributed,
                    lubesDistributed,
                    dentalDamsDistributed,
                    fingerCotsDistributed,
                    Men,
                    Women,
                    TransMen,
                    TransWomen,
                    GenderNotSpecified,
                    Hispanic,
                    AfricanAmerican,
                    Caucasian,
                    Asian,
                    RaceEthnicityNotSpecified,
                    Aged19_24,
                    Aged25_35,
                    Aged35_44,
                    Aged45,
                    AgeNotSpecified
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *`,
                values:[
                    date,
                    kitsDistributed,
                    extCondomsDistributed,
                    intCondomsDistributed,
                    oralCondomsDistributed,
                    lubesDistributed,
                    dentalDamsDistributed,
                    fingerCotsDistributed,
                    Men,
                    Women,
                    TransMen,
                    TransWomen,
                    GenderNotSpecified,
                    Hispanic,
                    AfricanAmerican,
                    Caucasian,
                    Asian,
                    RaceEthnicityNotSpecified,
                    Aged19_24,
                    Aged25_35,
                    Aged35_44,
                    Aged45,
                    AgeNotSpecified
                ]
            }
                db.query(query)
                .then((data) => {
                  res.status(200).json({message:"supplies_distributed saved successfully"})}
                  )
                
        } catch(e){
            res.status(400).send({message:"FAIL"})
            console.log("error",e)
        }
    },
    getById: async (req,res)=>{
    
        let { id } = await req.params;
        console.log("sg id",id)
        const query = {
          text: "select * from supplies_distributed where id=$1",
          values: [id],
        };

        try {
          const allData = await db.query(query);
                const response = allData.rows;
              /*   console.log("response", response); */
                console.log("response length", allData.rows);
                res.send(response);
          
        } catch (error) {
          console.log(error)
          res.send({errorMessage:error})
        }
    }, 
    updateCondomsDistributedEvent: async (req, res) => {
      let {
        id,
        date,
        kitsDistributed,
        extCondomsDistributed,
        intCondomsDistributed,
        oralCondomsDistributed,
        lubesDistributed,
        dentalDamsDistributed,
        fingerCotsDistributed,
        Men,
        Women,
        TransMen,
        TransWomen,
        GenderNotSpecified,
        Hispanic,
        AfricanAmerican,
        Caucasian,
        Asian,
        RaceEthnicityNotSpecified,
        Aged19_24,
        Aged25_35,
        Aged35_44,
        Aged45,
        AgeNotSpecified
      } = req.body;
  
  
      try {
        const query = await {
          name: "update-supplies-distributed",
          text: `update supplies_distributed set 
          date =$2,
          kitsDistributed =$3,
          extCondomsDistributed =$4,
          intCondomsDistributed =$5,
          oralCondomsDistributed =$6,
          lubesDistributed =$7,
          dentalDamsDistributed =$8,
          fingerCotsDistributed =$9,
          Men =$10,
          Women =$11,
          TransMen =$12,
          TransWomen =$13,
          GenderNotSpecified =$14,
          Hispanic =$15,
          AfricanAmerican =$16,
          Caucasian =$17,
          Asian =$18,
          RaceEthnicityNotSpecified =$19,
          Aged19_24 =$20,
          Aged25_35 =$21,
          Aged35_44 =$22,
          Aged45 =$23,
          AgeNotSpecified =$24
          where id=$1`,
          values: [
            id,
            date,
            kitsDistributed,
            extCondomsDistributed,
            intCondomsDistributed,
            oralCondomsDistributed,
            lubesDistributed,
            dentalDamsDistributed,
            fingerCotsDistributed,
            Men,
            Women,
            TransMen,
            TransWomen,
            GenderNotSpecified,
            Hispanic,
            AfricanAmerican,
            Caucasian,
            Asian,
            RaceEthnicityNotSpecified,
            Aged19_24,
            Aged25_35,
            Aged35_44,
            Aged45,
            AgeNotSpecified
          ],
        };
        db.query(query).then((response) => {
          console.log("response del success de up sg");
          res.send({
            data: response.rowCount,
            status: 200,
          });
        });
      } catch (error) {
        res.json("an error ocurred");
        console.log("error message:", error);
      }
    },
    delete: async (req, res) => {
      const { id } = req.body;
      const query = {
        text: "DELETE from supplies_distributed where id=$1",
        values: [id],
      };
      // promise
      db.query(query)
        .then((data) => {
          res.send({
            status: "OK",
            message: "Condoms distributed event deleted",
          });
        })
        .catch((e) => console.error(e.stack));
    },
}