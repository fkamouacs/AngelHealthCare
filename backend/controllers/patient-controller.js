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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        otherContactNumber: req.body.otherContactNumber,
        roomNumber: req.body.roomNumber
    } 

    newPatient = Patient.create(newPatient)
    res.json(newPatient)
}

updatePatientById = async (req, res) => {
    try {
        const { firstName, lastName, name, email, phoneNumber, otherContactNumber, roomNumber } = req.body;
        const patient = await Patient.findByIdAndUpdate(req.params.id, { firstName, lastName, name, email, phoneNumber, otherContactNumber, roomNumber }, { new: true });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
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
    updatePatientById,
    archivePatient,
    unarchivePatient
}