const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/room-controller')

router.post('/', RoomController.createRoom)
router.get('/:id', RoomController.getRoomById)
router.delete('/:id', RoomController.deleteRoomById)
router.get('/', RoomController.getRoomPairs)
router.put('/:id', RoomController.updateRoomById)

module.exports = router