
const express = require('express')
const router = express.Router()
const controller = require('../controllers/monitorFundingControllers')

router.get("/metrics",controller.monitorFundingMetrics)
router.get("/metrics/monitorFundingSap",controller.monitorFundingSap)
router.get("/metrics/monitor_funding_allClients_Saps",controller.monitorFundingClientsSaps)
router.get("/metrics/monitorFundingProgressNotes",controller.monitorFundingProgressNotes)




module.exports = router