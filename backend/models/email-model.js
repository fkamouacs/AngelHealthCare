const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const EmailSchema = new Schema(
    {
        title: { type: String, required: true},
        text: {type: String, required: true},
        sender: {type: ObjectId, required: true},
    },{timestamps: true}
)


module.exports = mongoose.model('Email', EmailSchema)