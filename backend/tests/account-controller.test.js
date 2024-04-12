const request = require('supertest');
const express = require('express');
const accountController = require('../controllers/account-controller');

// Mock the Account model
jest.mock('../models/user-model.js');
const Account = require('../models/user-model.js');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Mock request and response objects
const mockRequest = {};
const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
};

describe('Account Controller', () => {
    describe('GET /api/account/availableAccountsOnDate', () => {
        it('should return available accounts on a given date', async () => {
            // Mock request with a specific date
            mockRequest.body = { date: '2024-04-12' };

            // Mock response from the database
            const mockAccounts = [
                { _id: '1', name: 'Account 1', schedule: ['2024-04-12', '2024-04-13'] },
                { _id: '2', name: 'Account 2', schedule: ['2024-04-13', '2024-04-14'] },
            ];
            Account.find.mockResolvedValue(mockAccounts);

            // Call the controller method
            await accountController.getAvailableAccountsOnDate(mockRequest, mockResponse);

            // Verify that the response is correct
            expect(mockResponse.json).toHaveBeenCalledWith([mockAccounts[1]]);
        });
    });

    describe('POST /api/account/archiveAccount', () => {
        it('should archive an account', async () => {
            // Mock request with an account ID
            mockRequest.body = { accountId: '1' };

            // Mock response from the database
            const mockAccount = { _id: '1', name: 'Account 1', isArchived: false };
            Account.findOneAndUpdate.mockResolvedValue(mockAccount);

            // Call the controller method
            await accountController.archiveAccount(mockRequest, mockResponse);

            // Verify that the response is correct
            expect(mockResponse.json).toHaveBeenCalledWith(mockAccount);
        });
    });

    describe('POST /api/account/unarchiveAccount', () => {
        it('should unarchive an account', async () => {
            // Mock request with an account ID
            mockRequest.body = { accountId: '1' };

            // Mock response from the database
            const mockAccount = { _id: '1', name: 'Account 1', isArchived: true };
            Account.findOneAndUpdate.mockResolvedValue(mockAccount);

            // Call the controller method
            await accountController.unarchiveAccount(mockRequest, mockResponse);

            // Verify that the response is correct
            expect(mockResponse.json).toHaveBeenCalledWith(mockAccount);
        });
    });
});
