const express = require('express')
const router = express.Router()
const ProcedureController = require('../controllers/procedure-controller')

router.get('/:id', ProcedureController.getProcedureById)
router.get('/', ProcedureController.getAllProcedures)
router.post('/addProcedure', ProcedureController.addProcedure)
router.post('/addStaffProcedure', ProcedureController.addStaffProcedure)
router.post('/removeStaffProcedure', ProcedureController.removeStaffProcedure)
router.post('/addResourceProcedure', ProcedureController.addResourceProcedure)
router.post('/removeResourceProcedure', ProcedureController.removeResourceProcedure)
router.post('/addRoomProcedure', ProcedureController.addRoomProcedure)
router.post('/removeRoomProcedure', ProcedureController.removeRoomProcedure)
router.post('/completeProcedure', ProcedureController.completeProcedure)
router.post('/deleteProcedure', ProcedureController.deleteProcedure)

module.exports = router