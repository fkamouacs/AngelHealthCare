const Account = require('../models/user-model.js')



getAvailableAccounts = async (req,res) => {
    console.log("procedure id " + req.body.procedureId)
    
}

getAvailableAccountsOnDate = async (req,res) => {

}
removeAccountSchedule = async (req,res) => {

}
addAccountSchedule = async (req,res) => {

}
updateProcedureStaffDate = async (req,res) => {

}



module.exports = {
    getAvailableAccounts,
    getAvailableAccountsOnDate,
    removeAccountSchedule,
    addAccountSchedule,
    updateProcedureStaffDate
}