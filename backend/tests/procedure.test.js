// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Procedure = require('../models/procedure-model');
const ProcessController = require('../controllers/process-controller')
const http = require("http");


describe('add and delete procedure', () => {
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


        // call route
       

        expect(savedProcedure._id).toBeDefined();
        expect(savedProcedure.name).toBe(procedureData.name);
        expect(savedProcedure.patientId).toBe(procedureData.patientId);
        expect(savedProcedure.step).toBe(procedureData.step);
        expect(savedProcedure.stage).toBe(procedureData.stage);
    });
});


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

    it('should create procedure and call getprocedurebyid route', async () => {
        const procedureData = {
            name: 'test procedure',
            patientId: id,
            step: 0,
            stage: "test"
        };

        const procedure1 = new Procedure(procedureData);
        const savedProcedure = await procedure1.save();
        createdProcedureId = savedProcedure._id; // Store the created user's ID

        // call route

        await fetch(`http://localhost:3001/api/procedure/${createdProcedureId}`).then(res => {
            expect(res.data._id).toBe(createdProcedureId)
            expect(res.data.name).toBe(savedProcedure.name)
            expect(res.data.patientId).toBe(savedProcedure.patientId)
            expect(res.data.step).toBe(savedProcedure.step);
            expect(res.data.stage).toBe(savedProcedure.stage)
        })
    });
});

