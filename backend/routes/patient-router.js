const express = require('express')
const router = express.Router()
const PatientController = require('../controllers/patient-controller')

router.get('/', PatientController.getAllPatients)
router.get('/:id', PatientController.getPatientById)

module.exports = router