const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/schedule-controller')

router.get('/:email', ScheduleController.getScheduleByUser)
router.put('/accept/:id', ScheduleController.acceptSchedule)
router.put('/deny/:id', ScheduleController.denySchedule)

module.exports = router