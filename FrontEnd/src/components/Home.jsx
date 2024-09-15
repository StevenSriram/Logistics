import React from 'react';
import 'aos/dist/aos.css';

const Home = () => {
  return (
    <section id="home">
       {/* add data-aos / data-aos-duration */}
      <div className="content" data-aos="fade-up" data-aos-duration="1500">
        <h3>Efficient Transportation <br /> Solutions for Your Business</h3>
        <p>We offer reliable and cost-effective transportation services to meet your needs.
          Discover how our transportation services can simplify your logistics operations.
        </p>
        <button className="btn" id="btn" data-aos="zoom-in" data-aos-duration="1000">Get Started</button>
      </div>
    </section>
  );
}

export default Home;
