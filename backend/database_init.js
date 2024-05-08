// init.js
const mongoose = require('mongoose');
const faker = require('faker');
const ObjectId = mongoose.Types.ObjectId;

const Patient = require('./models/patient-model.js');
const Procedure = require('./models/procedure-model.js');
const Process = require('./models/process-model.js');
const Resource = require('./models/resource-model.js');
const Room = require('./models/room-model.js');
const Schedule = require('./models/schedule-model.js');
const Email = require('./models/email-model.js');




mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




async function createDummyData() {
    try {
        //await mongoose.connection.dropDatabase();  // Clears the entire database. Use with caution!

        // await Patient.deleteMany({});
        // await Procedure.deleteMany({});
        // await Process.deleteMany({});
        await Resource.deleteMany({});
        await Room.deleteMany({});
        // await Schedule.deleteMany({});
        // await Email.deleteMany({});


        for (let i = 0; i < 30; i++) {

            await Patient.create({
                name: faker.name.findName(),
                isArchived: false
            });

            const procedureId = new ObjectId();
            await Procedure.create({
                name: faker.commerce.productName(),
                patientId: new ObjectId(),
                step: faker.datatype.number({ min: 1, max: 10 }),
                stage: 'initial',
                date: faker.date.future()
            });

            await Process.create({
                name: faker.company.companyName(),
                patientId: new ObjectId(),
                currStage: 'started',
                startDate: faker.date.past(),
                endDate: faker.date.future()
            });

            await Resource.create({
                name: faker.commerce.productName(),
                count: faker.datatype.number(100),
                special_note: faker.lorem.sentence()
            });

            await Room.create({
                number: faker.datatype.number(100).toString(),
                max_capacity: faker.datatype.number(10),
                special_note: faker.lorem.sentence()
            });

            await Schedule.create({
                title: faker.lorem.words(),
                text: faker.lorem.sentences()
            });

            await Email.create({
                title: faker.lorem.sentence(),
                text: faker.lorem.paragraph(),
                sender: new ObjectId()
            });
        }

        console.log('Dummy data created successfully!');
    } catch (error) {
        console.error('Error creating dummy data:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyData();
