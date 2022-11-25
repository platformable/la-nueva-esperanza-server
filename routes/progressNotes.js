
const express = require('express')
const router = express.Router()
const controller = require('../controllers/progressNotesControllers')

/* router.get("/",controller.getClients) */
router.get("/:clientid",controller.getProgressNoteByClientId)
router.get("/profile_all/:clientid",controller.getAllProgressNoteForClientProfileByClientUniqueId)
router.get("/:clientid/profile/:id",controller.getProgressNoteForClientProfileByClientUniqueId)
router.put("/update",controller.updateProgressNote)
router.post("/",controller.createProgressNote)
router.delete("/delete",controller.deleteProgressNote)
/* router.get("/:clientid/profile",controller.getClientProfileData) */




module.exports = router
