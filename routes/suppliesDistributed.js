
const express = require('express')
const router = express.Router()
const controller = require('../controllers/suppliesDistributedControllers')

router.get("/",controller.getAll)
router.get("/reports/getall/:startDate&:endDate",controller.getAllForReports)
router.get("/:id",controller.getById)
router.post("/",controller.createNew)
router.put("/",controller.updateCondomsDistributedEvent)
router.delete("/",controller.delete)


module.exports = router