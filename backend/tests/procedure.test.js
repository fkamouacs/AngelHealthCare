const request = require('supertest');
const express = require('express');
const procedureController = require('../controllers/procedure-controller');


// Mock the Procedure model
jest.mock('../models/procedure-model.js');
const Procedure = require('../models/procedure-model.js');

// Create an Express app to use for testing
const app = express();
app.use(express.json());


// Mock request and response objects
const mockRequest = {};
const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
};


describe('Procedure Controller', () => {
    describe('GET /api/procedure/', () => {
        it('should return all procedures', async () => {
            
            var id = mongoose.Types.ObjectId();
       
            const mockProcedures = [
                { _id: '1', name: 'Procedure 1',patientId: id, step: 0, stage: "ongoing", staff: [], resources: [], rooms: [], date: null, hidden: false },
                { _id: '2', name: 'Procedure 2',patientId: id, step: 0, stage: "ongoing", staff: [], resources: [], rooms: [], date: null, hidden: false },
            ];
            Procedure.find.mockResolvedValue(mockProcedures);

            // Call the controller method
            await procedureController.getAllProcedures(mockRequest, mockResponse);

            // Verify that the response is correct
            expect(mockResponse.json).toHaveBeenCalledWith();
        });
    });

});