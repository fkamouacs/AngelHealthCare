const express = require('express')
const router = express.Router()
const PatientController = require('../controllers/patient-controller')

router.get('/', PatientController.getAllPatients)
router.get('/:id', PatientController.getPatientById)
router.post('/addpatient', PatientController.addPatient)
router.post('/archivePatient', PatientController.archivePatient)
router.post('/unarchivePatient', PatientController.unarchivePatient)
router.put('/:id', PatientController.updatePatientById)
module.exports = router