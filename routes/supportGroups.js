
const express = require('express')
const router = express.Router()
const controller = require('../controllers/supportGroupsControllers')

router.get("/",controller.getAllSupportGroups)
router.get("/:id",controller.getSupportGroupById)
router.post("/",controller.createNew)
router.put("/update",controller.updateSupportGroup)
router.delete("/delete",controller.delete)


module.exports = router