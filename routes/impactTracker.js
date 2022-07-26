
const express = require('express')
const router = express.Router()
const controller = require('../controllers/impactTrackerControllers')

router.post("/",controller.createNewImpactTracker)



module.exports = router