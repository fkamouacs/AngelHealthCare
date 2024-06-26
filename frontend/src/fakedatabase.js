/* eslint-disable eqeqeq */
function createProcesses(_id, name, patient, currStage, procedureIds, startDate, endDate) {
    return {_id, name, patient, currStage, procedureIds, startDate, endDate };
  }
  
  export const processes = [
    createProcesses(1,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    
  ];

  let tempProcessId = 7;

  export const getProcessById = (id) => {
    const isId = (p) => {
      return p._id === id;
  }
    return processes.find(isId)
  }

  export const getAllProcesses = () => {
    return processes;
  }

  export const addProcess = (name, patientId) => {
  
    const process = createProcesses(tempProcessId++, name, getPatientById(patientId).name, "", [], "4/4/2024", "N/A" )
    processes.push(process);
  }


  function createProcedure(_id, name, patient, step, stage, staff, resources, rooms, documents, date) {
    return {_id, name, patient, step, stage, staff, resources, rooms, documents, date}
  }

  
  export const procedures = [
    createProcedure(1,"preop", "John Smith",1, "success", [1,2],[1],[111], "http://google.com", "4/10/2024" ),
    createProcedure(2,"Knee Surgery", "John Smith", 2, "success",[3,4],[1,2],[112], "http://google.com", "4/25/2024"),
    createProcedure(3,"postop","John Smith", 3, "primary",[1,2],[1,2],[113], "http://google.com", "4/25/2024"),
    createProcedure(4,"checkup", "John Smith", 4, "disabled", [3,4],[1,2],[114], "http://google.com", "4/25/2024"),
  ]

  export const getAllProcedures = () => {
    return procedures
  }

 let tempPid = 5;

 export const addProcedure = (name, patient, date, staff, resources, rooms, processId) => {
  const currProcess = getProcessById(processId)
    const procedure = createProcedure(tempPid, name, patient, currProcess.procedureIds.length+1, "disabled", staff, resources, rooms, "", date )
    procedures.push(procedure);

    // add procedure id to process
    currProcess.procedureIds.push(tempPid);

    // update staff account schedules
    for (let i = 0; i < staff.length; i++) {
      addAccountSchedule(staff[i], date);
    }

    // update room schedules
    for (let i = 0; i < rooms.length; i++) {
      addRoomSchedule(rooms[i], date);
    }

    // update resource schedules
    for (let i = 0; i < resources.length; i++) {
      addResourceSchedule(resources[i], date);
    }

    tempPid++;
 }

export const getProcedureById = (id) => {
    const isId = (p) => {
        return p._id === id;
    }
    return procedures.find(isId)
}

export const removeStaffProcedure = (pid, staffId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.staff = currProcedure.staff.filter((e) => e !== staffId)
}

export const addStaffProcedure = (pid, staffId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.staff.push(staffId);
}

export const changeProcedureDate = (pid, date) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.date = date
}


  export const completeProcedure = (procedureId, processId) => {
    const currProcedure = getProcedureById(procedureId);
    currProcedure.stage = "success";


    //move to next procedure
    const currProcess = getProcessById(processId);

    const nextProcedure = getNextProcedureInProcess(procedureId, processId)

    if (nextProcedure !== null) {
      nextProcedure.stage = "primary"
    } else {
      // proceess complete set process end date
      currProcess.endDate = currProcedure.date;
    }
  }

  // returns the next procedure, if no next then returns null
  export const getNextProcedureInProcess = (procedureId, processId) => {
    const currProcedure = getProcedureById(procedureId);
    const currProcess = getProcessById(processId);

    const nextStep = currProcedure.step + 1;
    const procedureIds = currProcess.procedureIds

    for (let i = 0; i < procedureIds.length; i++) {
      const procedure = getProcedureById(procedureIds[i])
      if (procedure.step === nextStep) {
        return procedure;
      }
    } 
    return null;
  }




  function createAccount(_id, name, status, schedule) {
    return {_id, name, status, schedule}
  }

export const accounts = [
    createAccount(1, "John Doe", "Active", ["4/10/2024"]),
    createAccount(2, "Jane Doe", "Active", ["4/10/2024"]),
    createAccount(3, "Mary Doe", "Active", ["4/10/2024"]),
]

export const getAccountById = (id) => {
    const isId = (p) => {
        return p._id === id;
    }
    return accounts.find(isId)
}

export const getAvailableAccounts = (pid, date) => {
    const currProcedure = getProcedureById(pid);
    return accounts.filter((a) => !a.schedule.includes(date) || currProcedure.staff.includes(a._id));
}

export const getAvailableAccountsDate = (date) => {
  
  return accounts.filter((a) => !a.schedule.includes(date)) 
}

export const removeAccountSchedule = (aid, date) => {
    const currAccount = getAccountById(aid);
    console.log(aid)
    currAccount.schedule = currAccount.schedule.filter((e) => e !== date)
}

export const addAccountSchedule = (aid, date) => {
    const currAccount = getAccountById(aid);
    currAccount.schedule.push(date);
}

// on procedure date change, check if staff is available
// if available update their schedule with new date
// if not available update procedure's assigned staff and remove date from staff schedule
export const updateProcedureStaffDate = (pid, date) => {
    const currProcedure = getProcedureById(pid);

    let staffIds = currProcedure.staff
    const availableStaff = getAvailableAccounts(pid, date)
    console.log(availableStaff)
    for (let i = 0; i < staffIds.length; i++) {
    
        
        if (availableStaff.find((s) => s._id == staffIds[i])) {
            // keep staff in procedure array and update staff schedule
            removeAccountSchedule(staffIds[i], currProcedure.date)
            addAccountSchedule(staffIds[i], date)
        } else {
            // staff not available on new date
            // remove staff in procedure array and remove date from staff schedule
            removeStaffProcedure(currProcedure._id, staffIds[i]);
            removeAccountSchedule(staffIds[i], currProcedure.date);
        }
    }
}




function createRoom(_id, available, total, type, schedule) {
    return {_id, available, total, type, schedule}
  }
  
  export const rooms = [
    createRoom(111, 15,20, "surgery", ["4/10/2024"]),
    createRoom(112, 15,20, "surgery", ["4/11/2024"]),
    createRoom(113, 15,20, "surgery", ["4/10/2024"]),
    createRoom(114, 15,20, "surgery", ["4/10/2024"]),
    createRoom(115, 15,20, "surgery", [""]),
  ]

  export const getRoomById = (id) => {
    const isId = (p) => {
        return p._id === id;
    }
    return rooms.find(isId)
}

  export const getAvailableRooms = (pid, date) => {
    const currProcedure = getProcedureById(pid);
    return rooms.filter((r) =>!r.schedule.includes(date)|| currProcedure.rooms.includes(r._id))
  }

  export const getAvailableRoomsDate = (date) => {

    return rooms.filter((r) => !r.schedule.includes(date)) 
  }

  export const removeRoomProcedure = (pid, roomId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.rooms = currProcedure.rooms.filter((e) => e !== roomId)
}

  export const addRoomProcedure = (pid, roomId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.rooms.push(roomId);
}

export const removeRoomSchedule = (rid, date) => {
    const currRoom = getRoomById(rid);
    currRoom.schedule = currRoom.schedule.filter((e) => e !== date)
}

export const addRoomSchedule = (aid, date) => {
    const currRoom = getRoomById(aid);
    currRoom.schedule.push(date);
}



function createResource(_id, name, schedule) {
    return {_id, name, schedule}
  }
  
  export const resources = [
    createResource(1, "MRI machine", ["4/10/2024"]),
    createResource(2, "MRI machine", ["4/10/2024"]),
    createResource(3, "MRI machine", ["4/11/2024"]),
    createResource(4, "MRI machine", ["4/12/2024"]),
    createResource(5, "MRI machine", ["4/13/2024"]),
  
  ]

  export const getResourceById = (id) => {
    const isId = (p) => {
        return p._id === id;
    }
    return resources.find(isId)
}

export const getAvailableResources = (pid, date) => {
    const currProcedure = getProcedureById(pid);
    return resources.filter((r) =>!r.schedule.includes(date)|| currProcedure.resources.includes(r._id))
  }

  export const getAvailableResourcesDate = (date) => {
  
    return resources.filter((r) => !r.schedule.includes(date)) 
  }

  export const removeResourceProcedure = (pid, resourceId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.resources = currProcedure.resources.filter((e) => e !== resourceId)
}


export const addResourceProcedure = (pid, resourceId) => {
    const currProcedure = getProcedureById(pid);
    currProcedure.resources.push(resourceId);
}

export const removeResourceSchedule = (rid, date) => {
    const currResource = getResourceById(rid);
    currResource.schedule = currResource.schedule.filter((e) => e !== date)
}

export const addResourceSchedule = (aid, date) => {
    const currResource = getResourceById(aid);
    currResource.schedule.push(date);
}


function createPatient(_id, name) {
  return {_id, name}
}

export const patients = [
  createPatient(1, "John Smith"),
  createPatient(2, "Jane Smith"),
  createPatient(3, "Mary Smith"),
]

export const getAllPatients = () => {
  return patients;
}

export const getPatientById = (id) => {
  const isId = (p) => {
      return p._id == id;
  }

  return patients.find(isId)
}