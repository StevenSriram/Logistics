const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    companyName: { 
        type: String, 
        required: true 
    },
    vehicleType: { 
        type: String, 
        required: true 
    },
    maxLoad: { 
        type: Number, 
        required: true 
    },
    rentPerKilometer: { 
        type: Number, 
        required: true 
    },
    imageURL: { 
        type: String, 
        required: true, 
        unique: true 
    }
});

const VehicleModal = mongoose.model('Vehicle', vehicleSchema);

module.exports = VehicleModal
