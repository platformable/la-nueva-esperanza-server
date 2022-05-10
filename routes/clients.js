
const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientControllers')

router.get("/",controller.getClients)
router.get("/:clientid",controller.getClientById)
//router.delete("/delete/:id",controller.deleteClient)
router.post("/create",controller.createClient)
//router.put('/update/:id',controller.updateClient)



module.exports = router


