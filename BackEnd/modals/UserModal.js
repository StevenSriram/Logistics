const mongoose = require('mongoose')

// User Registration Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lower: true,
        trim: true
    },
    pass: {
        type: String,
        required: true
    }
})

// UserModal
const UserModal = mongoose.model('UserLogin', UserSchema)

module.exports = UserModal;