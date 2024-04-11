const http = require("http");

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const request = require('supertest');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

const server = http.createServer(app);

// server.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// needed for deployment
__dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')))
   


  
app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "PUT"],
        credentials: true
    })
);
app.use(express.json());

app.use(cookieParser());

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter);

const accountRouter = require('./routes/account-router')
app.use('/api/account', accountRouter);

const processRouter = require('./routes/process-router')
app.use('/api/process', processRouter)

const patientRouter = require('./routes/patient-router')
app.use('/api/patient', patientRouter)

const procedureRouter = require('./routes/procedure-routes')
app.use('/api/procedure', procedureRouter)


app.listen(process.env.PORT  || 3001, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3001);
})

app.get("/api/", (req, res) => {
    res.status(200).json({msg:"The get('/') was successful!"})
})

app.get("/", (req, res) => {
    res.status(200).json({msg:"The get('/1') was successful!"})
})

// app.put("/", (req, res) => {
//     res.status(200).json({msg:"The put('/') was successful!"})
// })

// const userSchema = new mongoose.Schema({
//     name: String,
//     password: String,
// });
// const User = mongoose.model('User', userSchema);

// app.get("/user", (req, res) => {
//     const userId = req.params.userId;

//     User.find({})
//         .then(users => {
//             if (!users) {
//                 return res.status(404).send("User not found");
//             }
//             res.send(users);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//     });
// })

// app.put("/user", (req, res) => {
//     const newUser = new User(req.body.user);

//     newUser.save()
//     .then(savedUser => {
//         console.log("added user");
//         res.status(201).send(savedUser);
//     })
//     .catch(err => {
//         console.log("error in adding user");
//         res.status(500).send(err);
//     });
// })


// deployment
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
} )

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


var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
main().catch(console.error);

module.exports = server;


