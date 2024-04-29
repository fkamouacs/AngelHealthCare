const Email = require('../models/email-model.js')
const User = require('../models/user-model.js')
const Schedule = require('../models/schedule-model.js')

getAllEmailByUser = async (req,res) => {
    const email = req.params.user;  

    User.findOne({email:email})
        .then(async (user) => {
            const emailIds = user.emails;
            const output = [];
            // console.log(emailIds.length);
            for(let id of emailIds){
                const email = await Email.findOne({_id:id});
                const sender = await User.findOne({_id:email.sender});
                const formatedEmail = {
                    _id: email._id,
                    title:email.title,
                    text:email.text,
                    sender: `${sender.firstName} ${sender.lastName}`,
                    schedule: email.schedule
                }
                output.push(formatedEmail);
            }
            // console.log(output);
            res.status(200).json(output);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
}


sendEmail = async (req,res) => {
    // console.log("sendEmail");
    const sender = await User.findOne({email:req.body.sender});
    const customEmail = {
        title:req.body.email.title, 
        text: req.body.email.text, 
        sender:sender,
        schedule: await Schedule.findOne({title:"quo architecto reiciendis"})
    };
    const receivers = req.body.receivers;
    const emailId = await Email.create(customEmail);

    try {
        for(let receiver of receivers){
            const updatedUser = await User.findOneAndUpdate(
                { email: receiver },
                { $push: { emails: emailId }},  
                { new: true }  
            );

            if (!updatedUser) {
                // console.log("not found : ", receiver)
                return res.status(500).send("User not found");
            }
        }
        // console.log("done")
        res.send("Email added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating the user");
    }
}


module.exports = {
    getAllEmailByUser,
    sendEmail,
}