const request = require('supertest');
const express = require('express');
const processController = require('../controllers/process-controller');


// Mock the Procedure model
jest.mock('../models/process-model.js');
const Process = require('../models/process-model.js');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Mock request and response objects
const mockRequest = {};
const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
};


describe('Process Controller', () => {
    describe('GET /api/process/', () => {
        it('should return all processes', async () => {
            
            var id = mongoose.Types.ObjectId();
       
            const mockProcesses = [
                { _id: '1', name: 'Process 1',patientId: id, curStage: "1", procedureIds: [], startDate: null, endDate: null, staff: [], hidden: false },
                { _id: '2', name: 'Process 2',patientId: id,  curStage: "1", procedureIds: [], startDate: null, endDate: null, staff: [], hidden: false  },
            ];
            Process.find.mockResolvedValue(mockProcesses);

            // Call the controller method
            await processController.getAllProcesses(mockRequest, mockResponse);

            // Verify that the response is correct
            expect(mockResponse.json).toHaveBeenCalledWith();
        });
    });

});