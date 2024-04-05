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
    baseURL: 'http://localhost:4000/api',
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

export const createAccount = ( name, status, schedule) => {
    return api.post(`/account/`, {
        // SPECIFY THE PAYLOAD
        name: name,
        status: status,
        schedule: schedule
    })
}

export const createRoom = (_id, available, total, type, schedule) => {
    return api.post(`/room/`, {
        // SPECIFY THE PAYLOAD
        _id: _id,
        available: available,
        total: total,
        type: type,
        schedule: schedule
    })
}

export const createResource = (name, schedule) => {
    return api.post(`/resource/`, {
        // SPECIFY THE PAYLOAD
        name: name,
        schedule: schedule
    })
}

export const createPatient = (name) => {
    return api.post(`/patient/`, {
        // SPECIFY THE PAYLOAD
        name: name
    })
}

export const deleteProcessById = (id) => api.delete(`/process/${id}`)
export const getProcessById = (id) => api.get(`/process/${id}`)
export const getProcessPairs = () => api.get(`/processpairs/`)
export const updateProcessById = (id, process) => {
    return api.put(`/process/${id}`, {
        // SPECIFY THE PAYLOAD
        process : process
    })
}

export const deleteProcedureById = (id) => api.delete(`/procedure/${id}`)
export const getProcedureById = (id) => api.get(`/procedure/${id}`)
export const getProcedurePairs = () => api.get(`/procedurepairs/`)
export const updateProcedureById = (id, procedure) => {
    return api.put(`/procedure/${id}`, {
        // SPECIFY THE PAYLOAD
        procedure : procedure
    })
}


export const deleteAccountById = (id) => api.delete(`/account/${id}`)
export const getAccountById = (id) => api.get(`/account/${id}`)
export const getAccountPairs = () => api.get(`/accountpairs/`)
export const updateAccountById = (id, account) => {
    return api.put(`/account/${id}`, {
        // SPECIFY THE PAYLOAD
        account : account
    })
}

export const deleteRoomById = (id) => api.delete(`/room/${id}`)
export const getRoomById = (id) => api.get(`/room/${id}`)
export const getRoomPairs = () => api.get(`/roompairs/`)
export const updateRoomById = (id, room) => {
    return api.put(`/room/${id}`, {
        // SPECIFY THE PAYLOAD
        room : room
    })
}

export const deleteResourceById = (id) => api.delete(`/resource/${id}`)
export const getResourceById = (id) => api.get(`/resource/${id}`)
export const getResourcePairs = () => api.get(`/resourcepairs/`)
export const updateResourceById = (id, resource) => {
    return api.put(`/resource/${id}`, {
        // SPECIFY THE PAYLOAD
        resource : resource
    })
}


export const deletePatientById = (id) => api.delete(`/patient/${id}`)
export const getPatientById = (id) => api.get(`/patient/${id}`)
export const getPatientPairs = () => api.get(`/patientpairs/`)
export const updatePatientById = (id, patient) => {
    return api.put(`/patient/${id}`, {
        // SPECIFY THE PAYLOAD
        patient : patient
    })
}

const apis = {
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

}

export default apis