const express = require('express')
const router = express.Router()
const ProcessController = require('../controllers/process-controller')

router.get('/getProcessById', ProcessController.getProcessById)
router.get('/', ProcessController.getAllProcesses)
router.put('/addProcess', ProcessController.addProcess)

module.exports = router