const User = require('../models/user-model.js')
const Schedule = require('../models/schedule-model.js')

getScheduleByUser = async (req,res) => {
    const email = req.params.email;  

    User.findOne({email:email})
        .then(async (user) => {
            const ScheduleIds = user.schedule;
            const output = [];
            // console.log(ScheduleIds.length);
            for(let id of ScheduleIds){
                const schedule = await Schedule.findOne({_id:id});
                if(schedule.hidden){
                    continue;
                }
                const formatedSchedule = {
                    _id: schedule._id,
                    title:schedule.title,
                    text:schedule.text,
                    isDone:schedule.isDone
                }
                output.push(formatedSchedule);
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

acceptSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({_id:req.params.id});
        const user = await User.findOne({email:req.body.email});

        if(user.schedule.includes(schedule)){
            res.statu(400).send("The user have already accepted this request.");
        }

        await User.updateOne({ email: req.body.email }, { $push: { schedule: schedule._id } });
        
        res.status(200).send("Schedule accepted successfully.");
    } catch (error) {
        console.log("An error occurred: " + error.message);
        res.status(500).send("An error occurred: " + error.message);
    }
}

denySchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({_id:req.params.id});
        const user = await User.findOne({email:req.body.email});

        await User.updateOne({ email: req.body.email }, { $pull: { schedule: schedule._id } });

        res.status(200).send("Schedule denied successfully.");
    } catch (error) {
        console.log("An error occurred: " + error.message);
        res.status(500).send("An error occurred: " + error.message);
}
}

module.exports = {
    getScheduleByUser,
    acceptSchedule,
    denySchedule,

};