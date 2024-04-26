// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Procedure = require('../models/procedure-model');

describe('GET /api/procedure/:id', () => {
    let createdProcedureId;
    var id = mongoose.Types.ObjectId();

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdProcedureId) {
            await Procedure.findByIdAndDelete(createdProcedureId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new procedure', async () => {
        const procedureData = {
            name: 'test procedure',
            patientId: id,
            step: 0,
            stage: "test"
        };

        const procedure1 = new Procedure(procedureData);
        const savedProcedure = await procedure1.save();
        createdProcedureId = savedProcedure._id; // Store the created user's ID

        expect(savedProcedure._id).toBeDefined();
        expect(savedProcedure.name).toBe(procedureData.name);
        expect(savedProcedure.patientId).toBe(procedureData.patientId);
        expect(savedProcedure.step).toBe(procedureData.step);
        expect(savedProcedure.stage).toBe(procedureData.stage);
    });
});
