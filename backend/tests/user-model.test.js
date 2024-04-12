const mongoose = require('mongoose');
const UserModel = require('../models/user-model');

describe('User Model', () => {
    let createdUserId;

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        // Delete the created user
        if (createdUserId) {
            await UserModel.findByIdAndDelete(createdUserId);
        }

        await mongoose.disconnect();
    });

    it('should create and save a new user successfully', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            passwordHash: 'hashed_password'
        };

        const user = new UserModel(userData);
        const savedUser = await user.save();
        createdUserId = savedUser._id; // Store the created user's ID

        expect(savedUser._id).toBeDefined();
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.passwordHash).toBe(userData.passwordHash);
    });

    it('should require firstName, lastName, email, and passwordHash fields', async () => {
        const user = new UserModel({});

        let error;
        try {
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.firstName).toBeDefined();
        expect(error.errors.lastName).toBeDefined();
        expect(error.errors.email).toBeDefined();
        expect(error.errors.passwordHash).toBeDefined();
    });
});
