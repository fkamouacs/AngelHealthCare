const Account = require('../models/user-model.js')
const Process = require('../models/process-model.js')
const Procedure = require('../models/procedure-model.js')
const Room = require('../models/room-model.js')
const Resource = require('../models/resource-model.js')
const Schedule = require('../models/schedule-model.js')
const mongoose = require('mongoose')

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
    Process.findOne({_id: req.body.processId}).exec().then(async currentProcess => {

        let newProcedure = {
            name: req.body.name,
            patientId: req.body.patientId,
            step: currentProcess.procedureIds.length+1,
           
            staff: req.body.staff,
            resources: req.body.resources,
            rooms: req.body.rooms,
            date: req.body.date
        } 

          // get stage of new procedure
          if (currentProcess.procedureIds.length == 0) {
            newProcedure["stage"] = "primary"
          }  else {
            // get last procedure
            const lastProcedure = await Procedure.findOne({_id: currentProcess.procedureIds[currentProcess.procedureIds.length - 1]})
            if (lastProcedure.stage == "success") {
              newProcedure["stage"]  = "primary"
            } else {
              newProcedure["stage"] = "disabled" 
            }
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

addStaffProcedure = async (req,res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid},{$push: {staff: req.body.staffId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}

removeStaffProcedure = async (req, res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid}, {$pull: {staff: req.body.staffId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}


addResourceProcedure = async (req,res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid}, {$push: {resources: req.body.resourceId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}

removeResourceProcedure = async (req, res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid}, {$pull: {resources: req.body.resourceId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}


addRoomProcedure = async (req, res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid}, {$push: {rooms: req.body.roomId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}

removeRoomProcedure = async (req, res) => {
  Procedure.findOneAndUpdate({_id: req.body.pid}, {$pull: {rooms: req.body.roomId}}).exec().then((doc) => {
    console.log(doc)
    res.json(doc)
}).catch((err) => {
    console.log(err)
})
}

completeProcedure = async (req, res) => {

  // get current procedure 
  const currProcedure = await Procedure.findOneAndUpdate({_id: req.body.procedureId}, {stage: "success"})

  // move to next procedure 

  const currProcess = await Process.findOne({_id: req.body.processId})

  // get next procedure 

  const nextStep = currProcedure.step + 1;
  const procedureIds = currProcess.procedureIds; 

  for(let i = 0; i < procedureIds.length; i++) {
    const procedure = await Procedure.findOne({_id: procedureIds[i]})
    if (procedure.step === nextStep) {
      await Procedure.findOneAndUpdate({_id: procedureIds[i]}, {stage: "primary"})
      
    }
  }

  // return current process

  res.json(currProcess);

}


deleteProcedure = async (req, res) => {
  // get procedure

  const procedure = await Procedure.findOne({_id: req.body.procedureId})
  const process = await Process.findOne({_id: req.body.processId})


  let notdone = true;
  const currStep = procedure.step

  console.log(procedure.step)
  for (let i = 0; i < process.procedureIds.length; i++) {
    const currProcedure = await Procedure.findOne({_id: process.procedureIds[i]})

    //  // update procedure stages
    if (procedure.stage == "primary" &&  currProcedure.step == currStep+1 && notdone) {
      await Procedure.findOneAndUpdate({_id: process.procedureIds[i]}, {stage: "primary"})
      done = false;  
   }

    // update procedure steps
   
    if (currProcedure.step > currStep) {
      await Procedure.findOneAndUpdate({_id: process.procedureIds[i]}, {step: currProcedure.step - 1})
    }

   

  }


  // delete schedule

  for (let i = 0; i < procedure.staff.length; i++) {
    const currAccount = await Account.findOneAndUpdate({_id: procedure.staff[i]}, {$pull: {schedule: procedure.date}})

      // delete staff schedule object

      for (let i = 0; i < currAccount.scheduleObjects.length; i++) {
        const scheduleObject = await Schedule.findOne({_id: currAccount.scheduleObjects[i]})
       
        if (scheduleObject.procedureId.equals(procedure._id)) {
          // remove staff schedule object from account
          console.log("hihi123")
          console.log(currAccount.scheduleObjects)
          console.log(scheduleObject._id)
          await Account.findOneAndUpdate({_id: procedure.staff[i]}, {$pull: {scheduleObjects: new mongoose.Types.ObjectId(scheduleObject._id)}})
        }
      }
      
      
  }

  // update room schedules
  for (let i = 0; i < procedure.rooms.length; i++) {
      await Room.findOneAndUpdate({_id: procedure.rooms[i]}, {$pull: {schedule: procedure.date}})
    }



  // update resource schedules
  for (let i = 0; i < procedure.resources.length; i++) {
    console.log("hixdxd")
    console.log(procedure.resources[i])
     await Resource.findOneAndUpdate({_id: procedure.resources[i]}, {$pull: {schedule: procedure.date}})
    }







  Process.findOneAndUpdate({_id: process._id}, {$pull: {procedureIds: procedure._id}},{ returnOriginal: false }).exec().then((process) =>{
    res.json(process);
})

}

module.exports = {
    getAllProcedures,
    getProcedureById,
    addProcedure,
    addStaffProcedure,
    removeStaffProcedure,
    addResourceProcedure,
    removeResourceProcedure,
    addRoomProcedure,
    removeRoomProcedure,
    completeProcedure,
    deleteProcedure
}