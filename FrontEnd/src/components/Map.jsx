// src/Map.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Setup default Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const location = useLocation();
  const { rentPerKm, company, image } = location.state || {};

  const [position, setPosition] = useState([20.5937, 78.9629]);
  const navigate = useNavigate(); // For navigation

  const [distance, setDistance] = useState(0); // State to store the distance

  const [zoom, setZoom] = useState(5);
  const mapRef = useRef();
  const routingControlRef = useRef(null);
  const markerRef = useRef(null);


  // Get current user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setZoom(13);

          const mapInstance = mapRef.current;
          if (mapInstance) {
            mapInstance.setView([latitude, longitude], 12);
            markerRef.current = L.marker([latitude, longitude]).addTo(mapInstance);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle map click event for setting a new marker and calculating the distance
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;

        L.marker([lat, lng]).addTo(mapInstance);

        if (routingControlRef.current) {
          routingControlRef.current.remove();
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(position[0], position[1]),
            L.latLng(lat, lng)
          ],
          routeWhileDragging: true
        }).addTo(mapInstance);

        // Calculate the distance between current location and marked point
        const startLatLng = L.latLng(position);
        const endLatLng = L.latLng(lat, lng);
        const calculatedDistance = startLatLng.distanceTo(endLatLng) / 1000; // Convert to kilometers
        setDistance(calculatedDistance);
      });
    }
  }, [position]);

  // Handle payment button click
  // const handlePayment = async () => 
  //   {
  //       const totalAmount = (distance * rentPerKm).toFixed(2);

  //       const stripe = await loadStripe('pk_test_51Q9gtF09C9oJJ9yv2j011OMgvLac4Ns1T2hFrrCJ6FB4B9USmNYY4z5H6KqN3vIc8wl2dy1uXFJ7jzc8ny9ewXy000C7UxHglE');
  //       const res = await axios.post("http://localhost:5000/api/checkout-session", {company, image, totalAmount} )

  //       stripe.redirectToCheckout({
  //         sessionId: res.data.id
  //       })

  //       // navigate('/booking', { state: { distance, totalAmount } });

  //   };

  const handlePayment = async () => {
    try {
        const totalAmount = Math.round((distance * rentPerKm) * 100);

        const stripe = await loadStripe('pk_test_51Q9gtF09C9oJJ9yv2j011OMgvLac4Ns1T2hFrrCJ6FB4B9USmNYY4z5H6KqN3vIc8wl2dy1uXFJ7jzc8ny9ewXy000C7UxHglE');

        const response = await axios.post("http://localhost:5000/api/checkout-session", {
            company,
            image,
            totalAmount: totalAmount / 100 
        });

        const { id } = response.data;

        await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
        console.error("Error during checkout session:", error);
    }
};

  




  return (
    <>
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: '100vh', width: '100%' }}
        ref={mapRef}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
            <div style={{
              position: 'absolute',
              zIndex: '1000',
              bottom: '20px',
              left: '20px',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
            }}>
              <h3 className="text-center">{company}</h3>
              {image && <img src={image} alt="Company" style={{ width: '100px', height: 'auto', marginBottom: '10px' }} className='d-block mx-auto'/>}

              <div className="d-flex align-items-between justify-content-center">
                <button 
                  onClick={handlePayment} 
                  disabled={distance === 0}
                  className="btn btn-dark text-white btn-sm mt-2"
                  >
                  Pay
                </button>
                  <h2 className='mt-2 ms-2'>${(distance * rentPerKm).toFixed(2)}</h2>
              </div>
            </div>
    </>
  );
};

export default Map;
