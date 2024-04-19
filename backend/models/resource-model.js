const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ResourceSchema = new Schema(
    {
        name: {type: String, required: true},
        count: {type:Number, required:true},
        special_note: {type:String, default:""},
        schedule: {type: [String], default: []},
        hidden: {type: Boolean, default: false}
    },{timestamps: true}
)


module.exports = mongoose.model('Resource', ResourceSchema)