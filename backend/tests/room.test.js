// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Room = require('../models/room-model');

describe('GET /api/room/:id', () => {
    let createdRoomId;

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdRoomId) {
            await Room.findByIdAndDelete(createdRoomId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new user successfully', async () => {
        const roomData = {
            number: '666',
            max_capacity: 30,
            empty_capacity: 30,
            special_note: 'test purpose'
        };

        const room1 = new Room(roomData);
        const savedRoom = await room1.save();
        createdRoomId = savedRoom._id; // Store the created room's ID

        expect(savedRoom._id).toBeDefined();
        expect(savedRoom.number).toBe(roomData.number);
        expect(savedRoom.max_capacity).toBe(roomData.max_capacity);
        expect(savedRoom.empty_capacity).toBe(roomData.empty_capacity);
        expect(savedRoom.special_note).toBe(roomData.special_note);
    });
});
