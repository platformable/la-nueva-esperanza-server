
const express = require('express')
const router = express.Router()
const controller = require('../controllers/supportGroupsControllers')

router.post("/",controller.createNew)

module.exports = router