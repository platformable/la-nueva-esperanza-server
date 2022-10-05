
const express = require('express')
const router = express.Router()
const controller = require('../controllers/progressNotesControllers')

/* router.get("/",controller.getClients) */
router.get("/:clientid",controller.getProgressNoteByClientId)
router.get("/profile_all/:clientUniqueId",controller.getAllProgressNoteForClientProfileByClientUniqueId)
router.get("/profile/:progressnoteid",controller.getProgressNoteForClientProfileByClientUniqueId)
router.post("/",controller.createProgressNote)
/* router.get("/:clientid/profile",controller.getClientProfileData) */




module.exports = router
