import React from 'react';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="heading6">Contact <span>Us</span></div>

            <p>We’re here to assist with all your logistics needs. Whether you have a question, need support, or want to discuss your requirements, please get in touch.</p>

            <input className="form-control" type="text" placeholder="Name" aria-label="Your Name" /><br/>
            <input className="form-control" type="email" placeholder="Email" aria-label="Your Email" /><br/>
            <input className="form-control" type="text" placeholder="Phone Number" aria-label="Your Phone Number" /><br/>
            <textarea className="form-control" placeholder="Message" aria-label="Your Message" rows="4"></textarea><br/>
            <button id="contact-btn">Send Message</button>
          </div>
          <div className="col-md-5" id="col">
            <h1>Contact <span>Information</span></h1>
            <p><i className="fa-regular fa-envelope"></i> info@logisticscompany.com</p>
            <p><i className="fa-solid fa-phone"></i> +1-800-123-4567</p>
            <p><i className="fa-solid fa-building-columns"></i> 123 Logistics Ave, Suite 456, City, State, ZIP</p>
            <p>Our team is available to answer your queries and provide support. Reach out to us anytime!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
