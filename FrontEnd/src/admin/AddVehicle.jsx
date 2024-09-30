import React, { useState } from 'react';
import axios from 'axios';

const AddVehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        companyName: '',
        vehicleType: '',
        maxLoad: '',
        rentPerKilometer: '',
        photo: null,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({ ...vehicleData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setVehicleData({ ...vehicleData, photo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message
        const formData = new FormData();

        // Append vehicle data
        formData.append('companyName', vehicleData.companyName);
        formData.append('vehicleType', vehicleData.vehicleType);
        formData.append('maxLoad', vehicleData.maxLoad);
        formData.append('rentPerKilometer', vehicleData.rentPerKilometer);
        formData.append('photo', vehicleData.photo);
        
        try {
            await axios.post('http://localhost:5000/vehicle/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Vehicle added successfully!');
            resetForm();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error adding vehicle.');
        }
    };

    const resetForm = () => {
        setVehicleData({
            companyName: '',
            vehicleType: '',
            maxLoad: '',
            rentPerKilometer: '',
            photo: null,
        });
        document.querySelector('input[type=file]').value = ''; // Reset file input
    };

    return (
        <div className="mt-5">
            <h1>Add Vehicle</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        name="companyName"
                        value={vehicleData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        name="vehicleType"
                        value={vehicleData.vehicleType}
                        onChange={handleChange}
                        placeholder="Vehicle Type"
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        name="maxLoad"
                        value={vehicleData.maxLoad}
                        onChange={handleChange}
                        placeholder="Max Load (kg)"
                        type="number"
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        name="rentPerKilometer"
                        value={vehicleData.rentPerKilometer}
                        onChange={handleChange}
                        placeholder="Rent Per Kilometer ($)"
                        type="number"
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;
