const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const request = require('supertest');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    },
});
  
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    })
);
app.use(express.json());

app.listen(8000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 8000);
})

app.get("/", (req, res) => {
    res.status(200).json({msg:"The get('/') was successful!"})
})

app.put("/", (req, res) => {
    res.status(200).json({msg:"The put('/') was successful!"})
})

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

app.get("/user", (req, res) => {
    const userId = req.params.userId;

    User.find({})
        .then(users => {
            if (!users) {
                return res.status(404).send("User not found");
            }
            res.send(users);
        })
        .catch(err => {
            res.status(500).send(err);
    });
})

app.put("/user", (req, res) => {
    const newUser = new User(req.body.user);

    newUser.save()
    .then(savedUser => {
        console.log("added user");
        res.status(201).send(savedUser);
    })
    .catch(err => {
        console.log("error in adding user");
        res.status(500).send(err);
    });
})

// request(app)
//     .get('/')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '38')
//     .expect(200)
//     .catch(err => {
//     if (err) throw err;
//     });

// request(app)
//     .put('/')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '38')
//     .expect(200)
//     .catch(err => {
//     if (err) throw err;
//     });

module.exports = server;