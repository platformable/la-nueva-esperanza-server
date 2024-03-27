
const express = require('express')
const router = express.Router()
const controller = require('../controllers/manageServicesControllers')

router.get("/manage_services_metric",controller.manageServicesMetric)
router.get("/manage_services_metric/sap",controller.servicesSap)
router.get("/manage_services_metric/progressNotes",controller.servicesProgressNotes)



module.exports = router