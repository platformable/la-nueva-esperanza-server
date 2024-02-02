
const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientControllers')

router.get("/",controller.getClients)
router.get("/reports/getall/:starDate&:endDate",controller.getClientsForReports)
router.get("/dashboard_page",controller.getClientsForDashboardPage)
router.get("/services_page",controller.getClientsForServicesPage)
router.get("/:clientid",controller.getClientById)
router.get("/:clientid/profile",controller.getClientProfileData)
router.get("/profile_by_uniqueid/:clientid",controller.getClientProfileDataByClientUniqueId)


router.get("/update/updatest",controller.updateTest)

//router.delete("/delete/:id",controller.deleteClient)
router.post("/create",controller.createClient)
router.put('/update/:id',controller.updateClient)
router.delete('/delete',controller.deleteClient)



module.exports = router


