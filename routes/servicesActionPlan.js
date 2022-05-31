
const express = require("express")
const router = express.Router()
const controller = require("../controllers/servicesActionPlanControllers")

router.post("/",controller.createServicesActionPlan)
router.get("/:clientid",controller.getClientServicesActionPlan)
router.put("/:clientid",controller.updateClientServicesActionPlan)
router.put("/:clientid/update_sap_from_progress_note",controller.updateSAPFormFromProgressNote)



module.exports = router


