/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;


const api = axios.create({
    baseURL: '/api',
})

api.get("/").then((res) => {
    console.log(res);
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createProcess = (name, patient, currStage, procedureIds, startDate, endDate) => {
    return api.post(`/process/`, {
        // SPECIFY THE PAYLOAD
        name: name,
        patient: patient,
        currStage: currStage,
        procedureIds: procedureIds,
        startDate: startDate,
        endDate: endDate
    })
}
export const createProcedure = (name, patient, step, stage, staff, resources, rooms, documents, date) => {
    return api.post(`/process/`, {
        // SPECIFY THE PAYLOAD
        name: name,
        patient: patient,
        step: step,
        stage: stage,
        staff: staff,
        resources: resources,
        rooms: rooms, 
        documents: documents,
        date: date
    })
}

export const createAccount = ( firstname, lastname, email, password, isAdmin) => {
    return api.post(`/account/`, {
        // SPECIFY THE PAYLOAD
        firstname: firstname,
        lastname : lastname,
        email: email,
        password: password,
        isAdmin: isAdmin
    })
}

export const createRoom = (number, max_capacity, empty_capacity, patients, resources, special_note) => {
    return api.post(`/room/`, {
        // SPECIFY THE PAYLOAD
        number: number,
        max_capacity: max_capacity,
        empty_capacity: empty_capacity,
        patients: patients,
        resources: resources,
        special_note: special_note,
    })
}

export const createResource = (name, count) => {
    return api.post(`/resource/`, {
        // SPECIFY THE PAYLOAD
        name: name,
        count: count
    })
}

export const createPatient = (name) => {
    return api.post(`/patient/`, {
        // SPECIFY THE PAYLOAD
        name: name
    })
}

export const deleteProcessById = (id) => api.delete(`/process/${id}`)

export const getProcessPairs = () => api.get(`/processpairs/`)
export const updateProcessById = (id, process) => {
    return api.put(`/process/${id}`, {
        // SPECIFY THE PAYLOAD
        process : process
    })
}

export const getProcessById = (id) => api.get(`/process/${id}`)

export const getAllProcesses = () => api.get('/process/')

export const addProcess = (name, patientId) => api.post('/process/addProcess', {name: name, patientId: patientId})




export const deleteProcedureById = (id) => api.delete(`/procedure/${id}`)

export const getProcedurePairs = () => api.get(`/procedurepairs/`)
export const updateProcedureById = (id, procedure) => {
    return api.put(`/procedure/${id}`, {
        // SPECIFY THE PAYLOAD
        procedure : procedure
    })
}



export const getProcedureById = (id) => api.get(`/procedure/${id}`)
export const getAllProcedures = () => api.get('/procedure/')
export const addProcedure = (name, patientId,date,  staff, resources, rooms, processId) => api.post('/procedure/addProcedure', {
    name: name,
    patientId: patientId,
    date: date,
    staff: staff,
    resources: resources,
    rooms: rooms,
    processId: processId
})
export const addStaffProcedure = (pid, staffId) => api.post('/procedure/addStaffProcedure', {
    pid: pid,
    staffId: staffId
})
export const removeStaffProcedure = (pid, staffId) => api.post('/procedure/removeStaffProcedure', {
    pid: pid,
    staffId: staffId
})


export const addResourceProcedure = (pid, resourceId) => api.post("/procedure/addResourceProcedure", {
    pid: pid,
    resourceId: resourceId
})


export const removeResourceProcedure = (pid, resourceId) => api.post('/procedure/removeResourceProcedure', {
    pid: pid,
    reousrceId: resourceId
})

export const addRoomProcedure = (pid, roomId) => api.post('/procedure/addRoomProcedure', {
    pid: pid,
    roomId: roomId
})

export const removeRoomProcedure = (pid, roomId) => api.post('/procedure/removeRoomProcedure', {
    pid: pid,
    roomId: roomId
})

export const deleteAccountById = (id) => api.delete(`/account/${id}`)

export const getAccountPairs = () => api.get(`/accountpairs/`)
export const updateAccountById = (id, account) => {
    return api.put(`/account/${id}`, {
        // SPECIFY THE PAYLOAD
        account : account
    })
}


export const getAccountById = (id) => api.get(`/account/${id}`)
export const archiveAccount = (id) => api.post('/account/archiveAccount', {accountId: id})
export const unarchiveAccount = (id) => api.post('/account/unarchiveAccount', {accountId: id})

export const getAvailableAccounts = (procedureId, date) => api.post('/account/availableAccounts',{procedureId: procedureId, date: date})
export const getAvailableAccountsOnDate = (date) => api.post('/account/availableAccountsDate', {date: date}) 
export const addAccountSchedule = (aid, date) => api.post('/account/addAccountSchedule', {aid: aid, date: date})
export const removeAccountSchedule = (aid, date) => api.post('/account/removeAccountSchedule', {aid: aid, date: date})

export const addRoomSchedule = (rid, date) => api.post('/room/addRoomSchedule', {rid: rid, date: date})

export const removeResourceSchedule = (rid, date) => api.post('/resource/removeResourceSchedule', {rid: rid, date: date})

export const removeRoomSchedule = (rid, date) => api.post('/room/removeRoomSchedule', {rid: rid, date: date})

export const deleteRoomById = (id) => api.delete(`/room/${id}`)
export const getRoomById = (id) => api.get(`/room/${id}`)
export const getRoomPairs = () => api.get(`/room/`)
export const updateRoomById = (id, room) => {
    return api.put(`/room/${id}`, {
        // SPECIFY THE PAYLOAD
        room : room
    })
}

export const getAllRooms = () => api.get('/room/')
export const getAvailableRooms = (procedureId, date) => api.post('/room/availableRooms',{procedureId: procedureId, date: date})
export const getAvailableRoomsOnDate = (date) => api.post('/room/availableRoomsDate', {date: date}) 




export const deleteResourceById = (id) => api.delete(`/resource/${id}`)
export const getResourceById = (id) => api.get(`/resource/${id}`)
export const getResourcePairs = () => api.get(`/resource/`)
export const updateResourceById = (id, name, count, special_note) => {
    return api.put(`/resource/${id}`, {
        // SPECIFY THE PAYLOAD
        name : name,
        count : count,
        special_note : special_note
    })
}


export const getAvailableResources = (procedureId, date) => api.post('/resource/availableResources',{procedureId: procedureId, date: date})
export const getAvailableResourcesOnDate = (date) => api.post('/resource/availableResourceDate', {date: date}) 
export const addResourceSchedule = (rid, date) =>  api.post('/resource/addResourceSchedule', {rid: rid, date: date})




export const deletePatientById = (id) => api.delete(`/patient/${id}`)

export const getPatientPairs = () => api.get(`/`)
export const updatePatientById = (id, patient) => {
    return api.put(`/patient/${id}`, {
        // SPECIFY THE PAYLOAD
        patient : patient
    })
}


export const getPatientById = (id) => api.get(`/patient/${id}`)
export const getAllPatients = () => api.get('/patient/')
export const addPatient = (name) => api.post('/patient/addPatient', {name: name})
export const archivePatient = (id) => api.post('/patient/archivePatient', {patientId: id})
export const unarchivePatient = (id) => api.post('/patient/unarchivePatient', {patientId: id})

export const getAllEmailByUser = (email) => api.get("/email/" + email);
export const sendEmail = (email, receivers, sender) => api.post("/email/", {email:email, receivers:receivers, sender:sender});

export const getAllScheduleByUser = (email) => api.get('/schedule/' + email);
export const acceptSchedule = (id,email) => api.put("/schedule/accept/" + id, {email: email});
export const denySchedule = (id,email) => api.put("/schedule/deny/" + id, {email: email});


const apis = {
    getAllScheduleByUser,
    acceptSchedule,
    denySchedule,
    createProcess,
    deleteProcessById,
    getProcessById,
    getProcessPairs,
    updateProcessById,
    deleteProcedureById,
    getProcedureById,
    getProcedurePairs,
    updateProcedureById,
    deleteAccountById,
    getAccountById,
    getAccountPairs,
    updateAccountById,
    getAvailableAccounts,
    getAvailableAccountsOnDate,
    deleteRoomById,
    getRoomById,
    getRoomPairs,
    updateRoomById,
    deleteResourceById,
    getResourceById,
    getResourcePairs,
    updateResourceById,
    deletePatientById,
    getPatientById,
    getPatientPairs,
    updatePatientById,
    getAllProcesses,
    addProcess,
    getAllPatients,
    addPatient,
    archiveAccount,
    unarchiveAccount,
    getAllProcedures,
    addProcedure,
    createResource,
    getAllRooms,
    getAvailableRooms,
    getAvailableRoomsOnDate,
    getAvailableResourcesOnDate,
    getAvailableResources,
    addStaffProcedure,
    addAccountSchedule,
    removeStaffProcedure,
    removeAccountSchedule,
    addResourceSchedule,
    addResourceProcedure,
    removeResourceProcedure,
    removeResourceSchedule,
    addRoomProcedure,
    addRoomSchedule,
    removeRoomProcedure,
    removeRoomSchedule,
    createRoom,
    createAccount,
    createPatient,
    sendEmail,
    getAllEmailByUser,

}

export default apis;