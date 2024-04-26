const Email = require('../models/email-model.js')
const User = require('../models/user-model.js')


getAllEmailByUser = async (req,res) => {
    const email = req.params.user;  

    User.findOne({email:email})
        .then(async (user) => {
            const emailIds = user.emails;
            const output = [];
            for(let id of emailIds){
                const email = await Email.findOne({_id:id});
                const sender = await User.findOne({_id:email.sender});
                const formatedEmail = {
                    title:email.title,
                    text:email.text,
                    sender: `${sender.firstName} ${sender.lastName}`
                }
                output.push(formatedEmail);
            }
            console.log(output);
            res.status(200).json(output);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
}


sendEmail = async (req,res) => {

    const sender = await User.findOne({email:req.body.sender});
    const customEmail = {title:req.body.email.title, text: req.body.email.title.text, sender:sender};
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
                return res.status(500).send("User not found");
            }
        }

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