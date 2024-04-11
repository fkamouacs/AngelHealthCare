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
}

module.exports = {
    getProcessById,
    getAllProcesses,
    addProcess,
}