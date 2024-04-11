const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProcessSchema = new Schema(
    {
        name: {type: String, required: true},
        patientId: {type: ObjectId, required: true},
        currStage: {type: String, default: ""},
        procedureIds: {type: [ObjectId], default: []},
        startDate: {type: Date, default: new Date()},
        endDate: {type: Date, default: null}
    }
)


module.exports = mongoose.model('Process', ProcessSchema)