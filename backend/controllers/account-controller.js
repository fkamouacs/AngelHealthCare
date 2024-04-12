const Account = require('../models/user-model.js')



getAvailableAccounts = async (req,res) => {
    console.log("procedure id " + req.body.procedureId)
    
}

getAvailableAccountsOnDate = async (req,res) => {
    console.log(req.body.date)

    try {
        const accounts = await Account.find({});
        const filter = accounts.filter((account) => !account.schedule.includes(req.body.date));
        res.json(filter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    //Commented this code out to ensure that the Account.find({}) method is returning a 
    //valid Mongoose query object that can be executed using the .exec() method
    
    //const query = Account.find({})

    //query.exec().then(docs => {
    //    const filter = docs.filter((d) => !d.schedule.includes(req.body.date))
    //    res.json(filter);
    //}).catch(err => {
    //    console.error(err);
    //})
}
removeAccountSchedule = async (req,res) => {

}
addAccountSchedule = async (req,res) => {

}
updateProcedureStaffDate = async (req,res) => {

}

archiveAccount = async (req,res) => {
    const filter = {_id: req.body.accountId}
    const update ={isArchived: true}

    let doc = await Account.findOneAndUpdate(filter, update);
    res.json(doc);
}

unarchiveAccount = async (req,res) => {
    const filter = {_id: req.body.accountId}
    const update ={isArchived: false}

    let doc = await Account.findOneAndUpdate(filter, update);
    res.json(doc);
}


module.exports = {
    getAvailableAccounts,
    getAvailableAccountsOnDate,
    removeAccountSchedule,
    addAccountSchedule,
    updateProcedureStaffDate,
    archiveAccount,
    unarchiveAccount,
    
}