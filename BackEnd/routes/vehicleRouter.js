// routes/vehicleRouter.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const VehicleModal = require('../modals/VehicleModal');

const vehicleRouter = express.Router();

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads'); // Directory for uploaded files
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original filename
    }
});

// Initialize the upload variable
const upload = multer({ storage });

// Add a new vehicle
vehicleRouter.post('/add', upload.single('photo'), async (req, res) => {
    try {
        const { companyName, vehicleType, maxLoad, rent } = req.body;

        const vehicle = new VehicleModal({
            companyName,
            vehicleType,
            maxLoad,
            rent,
            photo: req.file.path // Store the path of the uploaded file
        });

        await vehicle.save();
        res.status(201).json({ msg: "Vehicle added successfully", vehicle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error occurred", error: error.message });
    }
});

// Get all vehicles
vehicleRouter.get('/', async (req, res) => {
    try {
        const vehicles = await VehicleModal.find();
        res.json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error occurred", error: error.message });
    }
});

module.exports = vehicleRouter;
