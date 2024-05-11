const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require('path');
const socketIO = require("socket.io");
const http = require("http");

const app = express();

mongoose.connect('mongodb+srv://feridkamoua:test@cluster0.tlfbqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);

__dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')))

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/frontend/build')));

io.on("connection", socket => {
    console.log("connected with client");

    socket.on("notifyUpdate", () => io.emit("updated"));
    socket.on("logged in", () => {
        console.log("user logged in");
        socket.emit("connected");
    });

    socket.on("message updated", () => io.emit("message updated"));
    socket.on("schedule updated", () => io.emit("schedule updated"));
    socket.on("room updated", () => io.emit("room updated"));
    socket.on("patient updated", () => io.emit("patient updated"));
    socket.on("resource updated", () => io.emit("resource updated"));
});

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

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

const PORT = process.env.PORT || 3001;


app.get("/api/", (req, res) => {
  res.status(200).json({msg:"The get('/') was successful!"})
});

app.get("/", (req, res) => {
  res.status(200).json({msg:"The get('/1') was successful!"})
});

app.get('/*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});

app.put('/*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});

server.listen(3001, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
});