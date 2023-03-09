
const express = require('express')
const router = express.Router()
const controller = require('../controllers/msaFormControllers')

router.get("/",controller.getMsaForms)
router.post("/create_msa_form",controller.createMsaForm)
router.get("/:clientid",controller.getClientMsaForm)
router.get("/msa/:clientid",controller.getClientMsaForm)
router.put("/:clientid/update",controller.updateMsaForm)
router.put("/:clientid/update_des_msa_form",controller.updateDESMsaForm)
router.put("/:clientid/update_msa_form_from_progress_note",controller.updateMsaFormFromProgressNote)
router.put("/:clientid/update_supervisor_msa_form",controller.updateSupervisorMsaForm)




module.exports = router