
const express = require('express')
const router = express.Router()
const controller = require('../controllers/dbBackupControllers')

router.get("/",controller.createBackupFromClientSide)



module.exports = router