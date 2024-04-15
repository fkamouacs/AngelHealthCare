const Patient = require('../models/patient-model.js')



getAllPatients = async (req,res) => {
    const sortField = req.query.sortField || 'name';  
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;  

    Patient.find({})
        .sort({ [sortField]: sortOrder }) 
        .exec()
        .then((docs) => {
            // console.log(docs);
            res.json(docs);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
}

getPatientById = async (req,res) => {

    const query = Patient.findOne({_id: req.params.id})
    query.exec().then((doc) => {
        console.log(doc)
        res.json(doc)
    }).catch((err) => {
        console.log(err)
    })

}

addPatient = async (req,res) => {
    let newPatient = {
        name: req.body.name,
    } 

    newPatient = Procedure.create(newProcedure)
    res.json(newPatient)
}


archivePatient = async (req,res) => {
    const filter = {_id: req.body.patientId}
    const update ={isArchived: true}

    let doc = await Patient.findOneAndUpdate(filter, update);
    res.json(doc);
}

unarchivePatient = async (req,res) => {
    const filter = {_id: req.body.patientId}
    const update ={isArchived: false}

    let doc = await Patient.findOneAndUpdate(filter, update);
    res.json(doc);
}


module.exports = {
    getAllPatients,
    getPatientById,
    addPatient,
    archivePatient,
    unarchivePatient
}