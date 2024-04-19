const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProcedureSchema = new Schema(
    {
        name: {type: String, required: true},
        patientId: {type: ObjectId, required: true},
        step: {type: Number, required: true},
        stage: {type: String, required: true},
        staff: {type: [ObjectId], default: []},
        resources: {type: [ObjectId], default: []},
        rooms: {type: [ObjectId], default: []},
        date: {type: Date, default: null},
        hidden: {type: Boolean, default: false}
    },{timestamps: true}
)


module.exports = mongoose.model('Procedure', ProcedureSchema)