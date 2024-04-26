const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=/\'].;[,<>?:"{}`~\\|</>';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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
        verifyKey : {type:String, default: generateRandomString()}
        
    },{timestamps: true}
)


module.exports = mongoose.model('User', UserSchema)