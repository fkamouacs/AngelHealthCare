const Process = require('../models/process-model.js')

getProcessById = async (req,res) => {
 console.log(req.params.id)
}

getAllProcesses = async (req,res) => {
    console.log("XD")
}

addProcess = async (req,res) => {
    console.log(req.body.patientId)
    console.log(req.body.name)
    let newProcess = {
        name: req.body.name,
        patientId: req.body.patientId,
    }
    newProcess = await Process.create(newProcess);
    res.send(newProcess);
}

module.exports = {
    getProcessById,
    getAllProcesses,
    addProcess,
}