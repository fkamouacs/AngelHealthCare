const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PatientSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        otherContactNumber: {type: String, required: true},
        roomNumber: {type: String},
        isArchived: {type: Boolean, default: false},
        hidden: {type: Boolean, default: false}
    },{timestamps: true}
)


module.exports = mongoose.model('Patient', PatientSchema)