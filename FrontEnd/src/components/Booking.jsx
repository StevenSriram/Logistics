// BookingPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingPage = () => {
    const location = useLocation();
    const { booking } = location.state || {};

    const navigate = useNavigate()

    if (!booking) {
        return <div className="alert alert-warning">No vehicle data found.</div>;
    }

    return (
        <div className="container mt-5 border p-5">
            <h1 className="mb-4 ">Booking Details</h1>
            <div className="row py-5">
                <div className="col-md-6">
                    <img 
                        src={booking.imageURL} 
                        alt="Vehicle" 
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{booking.companyName}</h2>
                    <p className="text-muted">{booking.maxLoad} kg</p>
                    <h4 className="text-success">${booking.rentPerKilometer} /Km</h4>

                    <button
                        className="btn btn-primary btn-lg mt-3"
                        onClick={() => navigate('/map', {
                            state: {
                                rentPerKm: booking.rentPerKilometer,
                                company: booking.companyName,
                                image: booking.imageURL
                              }
                        })}
                        >
                        Route
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BookingPage;
