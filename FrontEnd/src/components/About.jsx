import React from 'react';
import logistics from '../images/logistics.webp'

const About = () => {
  
  return (
    <div className="about" id="about">
      <div className="container">
        <div className="heading">About <span>Us</span></div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img src={logistics} alt="Logistics" />
            </div>
          </div>
          <div className="col-md-6">
            <h3>Why Choose Our Logistics Services?</h3>
            <p>
              We provide efficient and reliable logistics solutions tailored to your needs.
              <br/><br/>
              <strong>Streamlined Operations:</strong> Our processes are designed to ensure smooth and timely deliveries.
              <br/><br/>
              <strong>Expert Team:</strong> Our experienced team handles every detail, from planning to execution.
              <br/><br/>
              <strong>Advanced Technology:</strong> We use the latest technology to track and manage shipments effectively.
            </p>
            <button id="about-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
