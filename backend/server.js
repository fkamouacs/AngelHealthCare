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

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.path}`);
    next();
});

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter);

const accountRouter = require('./routes/account-router')
app.use('/api/account', accountRouter);

const processRouter = require('./routes/process-router')
app.use('/api/process', processRouter)

const patientRouter = require('./routes/patient-router')
app.use('/api/patient', patientRouter)

const procedureRouter = require('./routes/procedure-router')
app.use('/api/procedure', procedureRouter)

const resourceRouter = require('./routes/resource-router')
app.use('/api/resource', resourceRouter)

const roomRouter = require('./routes/room-router')
app.use('/api/room', roomRouter)

const emailRouter = require('./routes/email-router')
app.use('/api/email', emailRouter)

const scheduleRouter = require('./routes/schedule-router')
app.use('/api/schedule', scheduleRouter)


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


// deployment
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
} )

app.put('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
} )

var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "stks01201@gmail.com",
      pass: "fsme avwz aohg ccry",
    },
  });
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'stks01201@gmail.com', // sender address
      to: "huifuli15@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<html><body>Hello and welcome</body></html>", // html body
    }, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
}
  
main().catch(console.error);


module.exports = server;


