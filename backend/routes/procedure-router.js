const express = require('express')
const router = express.Router()
const ProcedureController = require('../controllers/procedure-controller')

router.get('/:id', ProcedureController.getProcedureById)
router.get('/', ProcedureController.getAllProcedures)
router.post('/addProcedure', ProcedureController.addProcedure)

module.exports = router