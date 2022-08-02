
const express = require('express')
const router = express.Router()
const controller = require('../controllers/issuesControllers')

router.post("/",controller.createNewIssue)



module.exports = router