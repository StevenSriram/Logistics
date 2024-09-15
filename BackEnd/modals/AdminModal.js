const mongoose = require('mongoose')

// Admin Registration Schema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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

// AdminModal
const AdminModal = mongoose.model('AdminLogin', AdminSchema)

module.exports = AdminModal;