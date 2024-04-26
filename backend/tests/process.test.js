// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Process = require('../models/process-model');

describe('GET /api/process/:id', () => {
    let createdProcessId;
    var id = mongoose.Types.ObjectId();

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdProcessId) {
            await Process.findByIdAndDelete(createdProcessId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new process', async () => {
        const processData = {
            name: 'test process',
            patientId: id,
        };

        const process1 = new Process(processData);
        const savedProcess = await process1.save();
        createdProcessId = savedProcess._id; // Store the created user's ID

        expect(savedProcess._id).toBeDefined();
        expect(savedProcess.name).toBe(processData.name);
        expect(savedProcess.patientId).toBe(processData.patientId);
    });
});
