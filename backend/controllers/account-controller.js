const Account = require('../models/user-model.js')
const Procedure = require('../models/procedure-model.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;


var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "stks01201@gmail.com",
      pass: "fsme avwz aohg ccry",
    },
  });
// async..await is not allowed in global scope, must use a wrapper
async function sendVerifyLink(key, email) {
    // send mail with defined transport object
    
    const verifyLink = `http://localhost:3001/api/account/verify/${encodeURIComponent(email)}/${encodeURIComponent(key)}`;

    transporter.sendMail({
      from: 'stks01201@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Verifcation link", // Subject line
      text: `Please click on the link to get verified : ${verifyLink}`, // plain text body
      html: `Please click on the link to get verified : ${verifyLink}`, // html body
    }, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
}

verifyAccount = async (req, res) => {
    const email = req.params.email;
    const key = req.params.key;

    Account.findOneAndUpdate(
        { email: email, verifyKey: key }, 
        { $set: { verifyKey: null } }, 
        { new: true }
    )
    .then(updatedUser => {
        console.log("Updated User:", updatedUser);
    })
    .catch(err => {
        console.error("Error updating user:", err);
    });
}

addAccount = async (req, res) => {

    const { firstname, lastname, email, password, isAdmin} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newAccount = new Account({
            firstName: firstname,
            lastName: lastname,
            email: email,
            passwordHash: hashedPassword,
            isAdmin: isAdmin
        });

        const unverifiedAccount = await newAccount.save();

        sendVerifyLink(unverifiedAccount.verifyKey, unverifiedAccount.email)


        res.status(201).send('Account created successfully');
    } catch (error) {

        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
}

getAccountById = async (req, res) => {
    console.log(req.params._id);
    // Account.find({_id: req.params._id})
}

getAllAccounts = async (req,res) => {
    Account.find({})
    .exec()
    .then((docs) => {
        // console.log(docs);
        res.json(docs);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
}

getAvailableAccounts = async (req,res) => {
    // console.log("procedure id " + req.body.procedureId)
    try {
        const procedure = await Procedure.find({_id: req.body.procedureId})

        const accounts = await Account.find({});
        const filter = accounts.filter((account) => !account.schedule.includes(req.body.date) || procedure.staff.includes(account._id))
        res.json(filter)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
    
}

getAvailableAccountsOnDate = async (req,res) => {
    // console.log(req.body.date)

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
    Account.findOneAndUpdate({_id: req.body.aid}, {$pull: {schedule: req.body.date}}).exec().then((doc) => {
        // console.log(doc)
        res.json(doc)
    }).catch((err) => {
        // console.log(err)
    })
}

addAccountSchedule = async (req,res) => {
    Account.findOneAndUpdate({_id: req.body.aid}, {$push: {schedule : req.body.date}}).exec().then((doc) => {
        // console.log(doc)
        res.json(doc)
    }).catch((err) => {
        // console.log(err)
    })
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
    getAllAccounts,
    getAvailableAccounts,
    getAvailableAccountsOnDate,
    removeAccountSchedule,
    addAccountSchedule,
    updateProcedureStaffDate,
    archiveAccount,
    unarchiveAccount,
    addAccount,
    getAccountById,
    verifyAccount
    
}