const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RoomSchema = new Schema(
    {
        number: {type: String, required: true},
        max_capacity: {type:Number, required:true},
        patients: {type: [ObjectId], default: []},
        resource:{type:[ObjectId], default: []},
        special_note: {type:String, default:""}
    }
)


module.exports = mongoose.model('Room', RoomSchema)