
const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientsActionPlanControllers')

router.post("/",controller.createClientActionPlan)



module.exports = router