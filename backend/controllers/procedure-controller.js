const AccountController = require('../controllers/account-controller')
const ProcessController = require('../controllers/process-controller.js')

const Procedure = require('../models/procedure-model.js')

getAllProcedures = async (req,res) => {
   const query = Procedure.findOne({})

   query.exec().then((docs) => {
    console.log(docs)
    res.json(docs);
   }).catch((err) => {
    console.error(err)
   })
}

getProcedureById = async (req,res) => {

    const query = Procedure.findOne({_id: req.params.id})
    query.exec().then((doc) => {
        console.log(doc)
        res.json(doc)
    }).catch((err) => {
        console.log(err)
    })

}

addProcedure = async (req,res) => {
    const currentProcess = ProcessController.getProcessById(req.body.processId);

    let newProcedure = {
        name: req.body.name,
        patientId: req.body.patiendId,
        step: currProcess.procedureIds.length+1,
        stage: "disabled",
        staff: req.body.staff,
        resources: req.body.resources,
        rooms: req.body.rooms,
        date: req.body.date
    } 

    newProcedure = Procedure.create(newProcedure)

     // add procedure id to process
     console.log(newProcedure)

}

module.exports = {
    getAllProcedures,
    getProcedureById,
    addProcedure,
}