const Patient = require('../models/patient-model.js')



getAllPatients = async (req,res) => {
   const query = Patient.find({})

   query.exec().then((docs) => {
    console.log(docs)
    res.json(docs);
   }).catch((err) => {
    console.error(err)
   })
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



module.exports = {
    getAllPatients,
    getPatientById,
}