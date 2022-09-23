
const express = require('express')
const router = express.Router()
const controller = require('../controllers/impactBaselineControllers')

router.post("/",controller.createNewImpactBaseline)
router.get("/:id",controller.getClientBaselineByClientId)
router.put("/tracker/:id",controller.updateClientBaselineByClientId)



module.exports = router