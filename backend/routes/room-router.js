const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/room-controller')

router.get('/', RoomController.getAllRooms)
router.post('/', RoomController.createRoom)
router.post('/availableRooms', RoomController.getAvailableRooms)
router.post('/availableRoomsDate', RoomController.getAvailableRoomsOnDate)
router.put('/removeRoomSchedule', RoomController.removeRoomSchedule)
router.put('/addRoomSchedule', RoomController.addRoomSchedule)
router.post('/archiveRoom', RoomController.archiveRoom)
router.post('/unarchiveRoom', RoomController.unarchiveRoom)

module.exports = router