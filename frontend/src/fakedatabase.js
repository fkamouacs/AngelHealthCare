function createProcesses(_id, name, patient, currStage, procedureIds, startDate, endDate) {
    return {_id, name, patient, currStage, procedureIds, startDate, endDate };
  }
  
  export const processes = [
    createProcesses(1,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(2,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(3,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(4,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(5,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(6,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
  ];

  function createProcedure(_id, name, patient, step, stage, staff, resources, rooms, documents, date) {
    return {_id, name, patient, step, stage, staff, resources, rooms, documents, date}
  }
  
  export const procedures = [
    createProcedure(1,"preop", "John Smith",1, "success", [1,2],[1,2],[111], "http://google.com", "4/10/24" ),
    createProcedure(2,"Knee Surgery", "John Smith", 2, "success",[3,4],[1,2],[112], "http://google.com", "4/25/24"),
    createProcedure(3,"postop","John Smith", 3, "primary",[1,2],[1,2],[113], "http://google.com", "4/25/24"),
    createProcedure(4,"checkup", "John Smith", 4, "disabled", [3,4],[1,2],[114], "http://google.com", "4/25/24"),
  ]

 

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


  function createAccount(_id, name, status, schedule) {
    return {_id, name, status, schedule}
  }

export const accounts = [
    createAccount(1, "John Doe", "Active", ["4/10/24"]),
    createAccount(2, "Jane Doe", "Active", ["4/10/24"]),
    createAccount(3, "Mary Doe", "Active", ["4/10/24"]),
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

export const removeAccountSchedule = (aid, date) => {
    const currAccount = getAccountById(aid);
    currAccount.schedule = currAccount.schedule.filter((e) => e !== date)
}

export const addAccountSchedule = (aid, date) => {
    const currAccount = getAccountById(aid);
    currAccount.schedule.push(date);
}



function createRoom(_id, available, total, type, schedule) {
    return {_id, available, total, type, schedule}
  }
  
  export const rooms = [
    createRoom(111, 15,20, "surgery", ["4/10/24"]),
    createRoom(112, 15,20, "surgery", ["4/11/24"]),
    createRoom(113, 15,20, "surgery", ["4/10/24"]),
    createRoom(114, 15,20, "surgery", ["4/10/24"]),
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
