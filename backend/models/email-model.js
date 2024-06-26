const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const EmailSchema = new Schema(
    {
        title: { type: String, default: "no title"},
        text: {type: String, default: "no text"},
        sender: {type: ObjectId, required: true},
        hidden: {type: Boolean, default: false},
        schedule: {type: Object, default: null},
        procedureId: {type: ObjectId, defualt: "no procedure"}
    },{timestamps: true}
)


module.exports = mongoose.model('Email', EmailSchema)