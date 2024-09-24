const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    vehicleType: { 
        type: String, 
        required: true 
    },
    maxLoad: { 
        type: Number, 
        required: true 
    },
    rent: { 
        type: Number, 
        required: true
    },
    photo: { 
        type: String, 
        required: true 
    }, // path of Photo
});

const vehicleModal = mongoose.model('Vehicles', vehicleSchema);

module.exports = vehicleModal;
