
const express = require('express')
const router = express.Router()
const controller = require('../controllers/monitorFundingControllers')

router.get("/metrics",controller.monitorFundingMetrics)



module.exports = router