const Room = require('../models/room-model.js')


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
    getAllRooms,
    getAvailableRooms,
    getAvailableRoomsOnDate,
    removeRoomSchedule,
    addRoomSchedule,
    archiveRoom,
    unarchiveRoom,
    
}