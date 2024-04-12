const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ScheduleSchema = new Schema(
    {
        title: { type: String, required: true},
        text: {type: String, required: true},
    },{timestamps: true}
)


module.exports = mongoose.model('Schedule', ScheduleSchema)