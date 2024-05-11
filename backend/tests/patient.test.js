// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Patient = require('../models/patient-model');

describe('GET /api/patient/:id', () => {
    let createdPatientId;

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdPatientId) {
            await Patient.findByIdAndDelete(createdPatientId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new user successfully', async () => {
        const patientData = {
            firstName: 'wentao',
            lastName: 'he',
            name: 'wentao he',
        };

        const patient1 = new Patient(patientData);
        const savedPatient = await patient1.save();
        createdPatientId = savedPatient._id; // Store the created room's ID

        expect(savedPatient._id).toBeDefined();
        expect(savedPatient.firstName).toBe(patientData.firstName);
        expect(savedPatient.lastName).toBe(patientData.lastName);
        expect(savedPatient.name).toBe(patientData.name);
    });
});
