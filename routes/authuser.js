
const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorizedusersControllers')

router.get("/",controller.get)
router.delete("/",controller.delete)
router.post("/create",controller.post)
router.put("/",controller.updateUser)


module.exports = router