const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RoomSchema = new Schema(
    {
        number: {type: String, required: true},
        max_capacity: {type:Number, required:true},
        empty_capacity: {type:Number, default:0},
        patients: {type: [ObjectId], default: []},
        oldPatients: {type: [ObjectId], default: []},
        resources:{type:[ObjectId], default: []},
        special_note: {type:String, default:""},
        schedule:{type: [String], default: []},
        hidden: {type: Boolean, default: false}
    },{timestamps: true}
)


module.exports = mongoose.model('Room', RoomSchema)