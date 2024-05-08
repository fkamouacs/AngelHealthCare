const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PatientSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, default: "N/A"},
        phoneNumber: {type: String, required: true},
        otherContactNumber: {type: String, default: "N/A"},
        roomNumber: {type: String, required: true},
        isArchived: {type: Boolean, default: false},
        hidden: {type: Boolean, default: false}
    },{timestamps: true}
)


module.exports = mongoose.model('Patient', PatientSchema)