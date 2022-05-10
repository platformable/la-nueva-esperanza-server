
const express = require('express')
const router = express.Router()
const controller = require('../controllers/msaFormControllers')

router.get("/",controller.getMsaForms)
router.post("/create_msa_form",controller.createMsaForm)
router.get("/:clientid",controller.getClientMsaForm)
router.put("/:clientid/update",controller.updateMsaForm)



module.exports = router