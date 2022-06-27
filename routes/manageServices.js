
const express = require('express')
const router = express.Router()
const controller = require('../controllers/manageServicesControllers')

router.get("/manage_services_metric",controller.manageServicesMetric)



module.exports = router