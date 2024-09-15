import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';


const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="row">

        {/* Form Section */}
        <div className="col-md-8">
          <h2 style={{color: "#b2744c"}}>Contact Us</h2>
          <form>
            <div className="form-group mb-2">
              <label htmlFor="name">Name </label>
              <input type="text" className="form-control" name='name' id="name" required />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email">Email </label>
              <input type="email" className="form-control" name='email' id="email" required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="message">Message</label>
              <textarea style={{resize: 'none'}} className="form-control" name='message'
              id="message" rows="4" placeholder="Enter your Message Here" required />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="col-md-4" data-aos='fade-left' data-aos-duration='1500'>
          <div style={{boxShadow: '3px 3px #b2744c'}} className="contact-info text-bg-dark mt-5 p-3 rounded">
            <h4 style={{color: "cyan"}}>Contact Information</h4>
            <p><strong>Address:</strong> 123 Logistics Street, City, Country</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Email:</strong> support@logisticswebsite.com</p>
            <p><strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
