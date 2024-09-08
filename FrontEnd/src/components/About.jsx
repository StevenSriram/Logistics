import React from 'react';
import logistics from '../images/logistics.webp'

const About = () => {
  
  return (
    <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-7 mb-4 mb-md-0">
                    <img
                        src={logistics}
                        alt="About Us"
                        className="img-fluid"
                    />
                </div> 
                <div className="col-md-5 py-2">
                    <h3 style={{color: " #b2744c"}}>Why Choose Our Logistics Services?</h3>
                    <p>
                        We provide efficient and reliable logistics solutions tailored to your needs.
                        <br /><br />
                        <strong>Streamlined Operations:</strong> Our processes are designed to ensure smooth and timely deliveries.
                        <br /><br />
                        <strong>Expert Team:</strong> Our experienced team handles every detail, from planning to execution.
                        <br /><br />
                        <strong>Advanced Technology:</strong> We use the latest technology to track and manage shipments effectively.
                    </p>
                    <button id="about-btn" className="btn btn-primary">Learn More</button>
                </div>
            </div>
        </div>
  );
}

export default About;
