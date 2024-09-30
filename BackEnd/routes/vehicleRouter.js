// routes/vehicleRouter.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const VehicleModal = require('../modals/VehicleModal');

const vehicleRouter = express.Router();

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, '_');
        cb(null, `${timestamp}-${originalName}`);
    }
});

// Initialize the upload variable
const upload = multer({ storage: storage });


// Add a new vehicle
vehicleRouter.post('/add', upload.single('photo'), async (req, res) => {
    try {
        const { companyName, vehicleType, maxLoad, rentPerKilometer } = req.body;
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const vehicle = new VehicleModal({
            companyName,
            vehicleType,
            maxLoad,
            rentPerKilometer,
            imageURL: imageUrl
        });

        await vehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        res.status(500).json({ error: 'Error adding vehicle' });
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

// Get Vehicle by ID
vehicleRouter.get('/:id', async (req, res) => {
    try 
    {
        const vehicle = await VehicleModal.findById(req.params.id);
        if (!vehicle) 
            return res.status(404).send('Vehicle not found');

        res.json(vehicle);
    } 
    catch (error) 
    {
        res.status(500).send('Server Error');
    }
});

module.exports = vehicleRouter;
