const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RoomSchema = new Schema(
    {
        number: {type: String, required: true},
        max_capacity: {type:Number, required:true},
        empty_capacity: {type:Number, default:0},
        patients: {type: [ObjectId], default: []},
        resource:{type:[ObjectId], default: []},
        special_note: {type:String, default:""}
    },{timestamps: true}
)


module.exports = mongoose.model('Room', RoomSchema)