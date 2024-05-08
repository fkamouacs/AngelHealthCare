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
                const date = new Date(email.createdAt);

                // Format the date to display hour and minutes
                const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

                let status = "deny";

                if(email.schedule !== undefined && email.schedule !== null){
                    for(let obj of user.scheduleObjects){
                        if(String(obj) === String(email.schedule._id)){
                            status = "accept";
                            break;
                        }
                    }
                }

                if(sender == null || sender == undefined){
                    sender = []
                }
                

                const formatedEmail = {
                    _id: email._id,
                    title:email.title,
                    text:email.text,
                    sender: `${sender.firstName} ${sender.lastName}`,
                    schedule: email.schedule,
                    date: formattedDate,
                    status: status
                }

                output.push(formatedEmail);
            }
            output.reverse();
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
    
    };

    // if(req.body.schedule !== undefined && req.body.schedule !== null){
    //     customEmail["schedule"] = req.body.schedule;
    // }else{
    //     customEmail["schedule"] = await Schedule.findOne();
    // }

    // make a new schedule object
    const newSchedule = {
        title: req.body.email.title,
        text: req.body.email.text,
        date: req.body.email.schedule
    }


    if (req.body.email.procedureId !== undefined && req.body.email.procedureId !== null) {
        newSchedule["procedureId"] = req.body.email.procedureId
        customEmail["procedureId"] = req.body.email.procedureId
    }

    await Schedule.create(newSchedule).then((schedule) => {
        customEmail["schedule"] = schedule;
        console.log("schedule created " + schedule)
    })


   

    const receivers = req.body.receivers;
    const emailId = await Email.create(customEmail);
    console.log("receiversxd " + req.body.receivers)

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