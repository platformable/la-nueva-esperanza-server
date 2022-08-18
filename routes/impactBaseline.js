
const express = require('express')
const router = express.Router()
const controller = require('../controllers/impactBaselineControllers')

router.post("/",controller.createNewImpactBaseline)



module.exports = router