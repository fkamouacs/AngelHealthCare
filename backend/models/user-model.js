const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        role: {type: String, required: true},
        status: {type: String, default: 'active'},
        schedule: {type: [String], default: []},
        emails: {type: [ObjectId], default: []},
        isArchived: {type: Boolean, default: false},
        hidden: {type: Boolean, default: false},
        
    },{timestamps: true}
)


module.exports = mongoose.model('User', UserSchema)