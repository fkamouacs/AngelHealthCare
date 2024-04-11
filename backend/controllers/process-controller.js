const Process = require('../models/process-model.js')

getProcessById = async (req,res) => {
    console.log(req.params.id)
    
    const query = Process.findOne({_id: req.params.id})

    query.exec().then((doc) => {
        res.json(doc)
    }).catch((err) => {
        conso.error(err)
    })
 
}

getAllProcesses = async (req,res) => {
    const query = Process.find({})

    query.exec().then((docs) => {
     console.log(docs)
     res.json(docs);
    }).catch((err) => {
     console.error(err)
    })
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