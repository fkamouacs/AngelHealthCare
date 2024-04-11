const express = require('express')
const router = express.Router()
const ProcessController = require('../controllers/process-controller')

router.get('/:id', ProcessController.getProcessById)
router.get('/', ProcessController.getAllProcesses)
router.post('/addProcess', ProcessController.addProcess)

module.exports = router