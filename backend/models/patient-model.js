const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PatientSchema = new Schema(
    {
        name: {type: String, required: true},
        isArchived: {type: Boolean, default: false}
    }
)


module.exports = mongoose.model('Patient', PatientSchema)