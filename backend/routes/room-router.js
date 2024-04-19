const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/room-controller')

// router.post('/', RoomController.createRoom)
// router.get('/:id', RoomController.getRoomById)
// router.delete('/:id', RoomController.deleteRoomById)
// router.get('/', RoomController.getRoomPairs)
// router.put('/:id', RoomController.updateRoomById)
router.get('/', RoomController.getAllRooms)
router.post('/', RoomController.createRoom)
router.post('/availableRooms', RoomController.getAvailableRooms)
router.post('/availableRoomsDate', RoomController.getAvailableRoomsOnDate)
router.post('/removeRoomSchedule', RoomController.removeRoomSchedule)
router.post('/addRoomSchedule', RoomController.addRoomSchedule)
router.post('/archiveRoom', RoomController.archiveRoom)
router.post('/unarchiveRoom', RoomController.unarchiveRoom)

module.exports = router