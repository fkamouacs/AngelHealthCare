// Assuming you have a file structure where the server can be required like this:
const mongoose = require('mongoose');
const Resource = require('../models/resource-model');

describe('GET /api/resource/:id', () => {
    let createdResourceId;

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdResourceId) {
            await Resource.findByIdAndDelete(createdResourceId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new user successfully', async () => {
        const resourceData = {
            name: 'John',
            count: 100,
            special_note: 'For hospital'
        };

        const resource1 = new Resource(resourceData);
        const savedResource = await resource1.save();
        createdResourceId = savedResource._id; // Store the created user's ID

        expect(savedResource._id).toBeDefined();
        expect(savedResource.name).toBe(resourceData.name);
        expect(savedResource.count).toBe(resourceData.count);
        expect(savedResource.special_note).toBe(resourceData.special_note);
    });
});
