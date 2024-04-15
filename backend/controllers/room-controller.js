// const Room = require('../models/room-model.js'); // Path might vary depending on your project structure


// // Create a new room
// createRoom = async (req, res) => {
//     try {
//         const room = new Room(req.body);
//         await room.save();
//         res.status(201).send(room);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }

// // Get a room by ID
// getRoomById = async (req, res) => {
//     try {
//         const room = await Room.findById(req.params.id);
//         if (!room) {
//             return res.status(404).send();
//         }
//         res.send(room);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

// // Update a room by ID
// updateRoomById = async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['number', 'max_capacity', 'patients', 'resource', 'special_note'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!room) {
//             return res.status(404).send();
//         }
//         res.send(room);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }

// // Delete a room by ID
// deleteRoomById = async (req, res) => {
//     try {
//         const room = await Room.findByIdAndDelete(req.params.id);
//         if (!room) {
//             return res.status(404).send();
//         }
//         res.send(room);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

// // Get room pairs (additional functionality if needed)
// getRoomPairs = async (req, res) => {
//     console.log("getRoomPairs")
//     try {
//         const rooms = await Room.find({});
//         res.json(rooms);
//     } catch (error) {
//         res.status(500).send(error);
    // }
    
const Room = require('../models/room-model.js')


createRoom = async (req,res) => {
    let newRoom = {
        number: req.body.number,
        max_capacity: req.body.max_capacity,
        empty_capacity: req.body.empty_capacity,
        patients: req.body.patients,
        resources: req.body.resources,
        special_note: req.body.special_note
    } 

    Room.create(newRoom).then(r => {
        res.json(r);
    })

}

getAllRooms = async (req,res) => {
    Room.find({})
    .exec()
    .then((docs) => {
        console.log(docs);
        res.json(docs);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
}

getAvailableRooms = async (req,res) => {
    console.log("procedure id " + req.body.procedureId)
    
}

getAvailableRoomsOnDate = async (req,res) => {
    console.log(req.body.date)
    console.log("XD")
    try {
        const rooms = await Room.find({});
        const filter = rooms.filter((room) => !room.schedule.includes(req.body.date));
        res.json(filter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
removeRoomSchedule = async (req,res) => {

}
addRoomSchedule = async (req,res) => {

}

archiveRoom = async (req,res) => {
    const filter = {_id: req.body.roomId}
    const update ={isArchived: true}

    let doc = await Room.findOneAndUpdate(filter, update);
    res.json(doc);
}

unarchiveRoom = async (req,res) => {
    const filter = {_id: req.body.roomId}
    const update ={isArchived: false}

    let doc = await Room.findOneAndUpdate(filter, update);
    res.json(doc);
}


module.exports = {
    // createRoom,
    // getRoomById,
    // updateRoomById,
    // deleteRoomById,
    // getRoomPairs

    getAllRooms,
    getAvailableRooms,
    getAvailableRoomsOnDate,
    removeRoomSchedule,
    addRoomSchedule,
    archiveRoom,
    unarchiveRoom,
    

};