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

}



module.exports = {
    getAllPatients,
    getPatientById,
}