const Account = require('../models/user-model.js')
const Process = require('../models/process-model.js')
const Procedure = require('../models/procedure-model.js')
const Room = require('../models/room-model.js')
const Resource = require('../models/resource-model.js')

getAllProcedures = async (req,res) => {
   const query = Procedure.find({})

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
    console.log("processId " + req.body.processId + " hello")
    Process.findOne({_id: req.body.processId}).exec().then(currentProcess => {

        let newProcedure = {
            name: req.body.name,
            patientId: req.body.patientId,
            step: currentProcess.procedureIds.length+1,
            stage: "disabled",
            staff: req.body.staff,
            resources: req.body.resources,
            rooms: req.body.rooms,
            date: req.body.date
        } 
    
        
    
          // update staff account schedules
          for (let i = 0; i < req.body.staff.length; i++) {
            Account.findOneAndUpdate({_id: req.body.staff[i]}, {$push: {schedule: req.body.date}}).exec()
          }


            // update room schedules
            for (let i = 0; i < req.body.rooms.length; i++) {
                Room.findOneAndUpdate({_id: req.body.rooms[i]}, {$push: {schedule: req.body.date}}).exec()
              }
       
            // update resource schedules
            for (let i = 0; i < req.body.resources.length; i++) {
                Resource.findOneAndUpdate({_id: req.body.resources[i]}, {$push: {schedule: req.body.date}}).exec()
              }

              

          newProcedure = Procedure.create(newProcedure).then((p) => {
            // add procedure id to process
               console.log("pid " + currentProcess._id)
               Process.findOneAndUpdate({_id: currentProcess._id}, {$push: {procedureIds: p._id}},{ returnOriginal: false }).exec().then((process) =>{
                    res.json(process);
               })
               
            })
        
    })



    
    

}

module.exports = {
    getAllProcedures,
    getProcedureById,
    addProcedure,
}