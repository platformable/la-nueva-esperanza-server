
const express = require('express')
const router = express.Router()
const controller = require('../controllers/suppliesDistributedControllers')

router.get("/",controller.getAll)
router.post("/",controller.createNew)

module.exports = router