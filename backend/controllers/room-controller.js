const Room = require('../models/room-model.js'); // Path might vary depending on your project structure


// Create a new room
createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get a room by ID
getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a room by ID
updateRoomById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['number', 'max_capacity', 'patients', 'resource', 'special_note'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a room by ID
deleteRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get room pairs (additional functionality if needed)
getRoomPairs = async (req, res) => {
    console.log("getRoomPairs")
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createRoom,
    getRoomById,
    updateRoomById,
    deleteRoomById,
    getRoomPairs
};