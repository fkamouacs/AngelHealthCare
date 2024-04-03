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

  function createProcedure(_id, name, patient, stage, staff, resources, rooms, documents, date) {
    return {_id, name, patient, stage, staff, resources, rooms, documents, date}
  }
  
  export const procedures = [
    createProcedure(1,"preop", "John Smith", "success", [1,2],[1,2],[1], "http://google.com", "4/10/24" ),
    createProcedure(2,"Knee Surgery", "John Smith", "success",[3,4],[1,2],[1], "http://google.com", "4/25/24"),
    createProcedure(3,"postop","John Smith", "primary",[1,2],[1,2],[1], "http://google.com", "4/25/24"),
    createProcedure(4,"checkup", "John Smith", "disabled", [3,4],[1,2],[1], "http://google.com", "4/25/24"),
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
    createAccount(1, "John Doe", "Active", []),
    createAccount(2, "Jane Doe", "Active", []),
    createAccount(3, "Mary Doe", "Active", ["4/10/24"]),
]


export const getAvailableAccounts = (date) => {
    return accounts.filter((a) => !a.schedule.includes(date) );
}



function createRoom(id, available, total, type, schedule) {
    return {id, available, total, type, schedule}
  }
  
  export const rooms = [
    createRoom(111, 15,20, "surgery", ["4/10/24"]),
    createRoom(112, 15,20, "surgery", ["4/10/24"]),
    createRoom(113, 15,20, "surgery", ["4/10/24"]),
    createRoom(114, 15,20, "surgery", [""]),
    createRoom(115, 15,20, "surgery", [""]),
  ]

  export const getAvailableRooms = (date) => {
    
  }