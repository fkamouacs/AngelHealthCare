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
const Procedure = require('../models/procedure-model.js')
const Patient = require('../models/patient-model.js')

createRoom = async (req,res) => {
    let newRoom = {
        number: req.body.number,
        max_capacity: req.body.max_capacity,
        empty_capacity: req.body.max_capacity - req.body.patients.length,
        patients: req.body.patients,
        resources: req.body.resources,
        special_note: req.body.special_note
    } 
    for(let i = 0; i < req.body.patients.length; i++){
        const patient = await Patient.findByIdAndUpdate(req.body.patients[i], { roomNumber: req.body.number}, { new: true });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
    }
    Room.create(newRoom).then(r => {
        res.json(r);
    })

}

getRoomById = async (req, res) => {
    console.log(`getRoomById`);
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

updateRoomById = async (req, res) => {
    try {
        const { number, max_capacity, empty_capacity, patients, resources, special_note } = req.body;
        const new_empty_capacity = max_capacity - patients.length;
        const room = await Room.findByIdAndUpdate(req.params.id, { number, max_capacity, empty_capacity: new_empty_capacity, patients, resources, special_note  }, { new: true });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
        for(let i = 0; i < patients.length; i++){
            const patient = await Patient.findByIdAndUpdate(patients[i], { roomNumber: number}, { new: true });
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
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
    try {
        const procedure = await Procedure.find({_id: req.body.procedureId})

        const rooms = await Room.find({})
        const filter = rooms.filter((room) =>  !room.schedule.includes(req.body.date) || procedure.rooms.includes(room._id))
      
        res.json(filter)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
    
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
    Room.findOneAndUpdate({_id: req.body.rid}, {$pull: {schedule: req.body.date}}).exec().then((doc) => {
        console.log(doc)
        res.json(doc)
    }).catch((err) => {
        console.log(err)
    })
}

addRoomSchedule = async (req,res) => {
    Room.findOneAndUpdate({_id: req.body.rid}, {$push: {schedule: req.body.date}}).exec().then((doc) => {
        console.log(doc)
        res.json(doc)
    }).catch((err) => {
        console.log(err)
    })
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
    createRoom,
    getRoomById,
    updateRoomById

};