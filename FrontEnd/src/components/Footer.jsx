import React from 'react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
        <footer id="footer">
        <button className="scroll-to-top" onClick={scrollToTop}>
          ☝
        </button>
        <div className="socail-links text-center">
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-facebook-f"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-youtube"></i>
        <i className="fa-brands fa-pinterest-p"></i>
        </div>
        <div className="credite text-center">
            Designed By <a href="#">Steven Sriram</a>
        </div>
        <div className="copyright text-center">
        &copy; Copyright <strong><span>Logistics</span></strong>. All Rights Reserved
    </div>
    </footer>
    </>
  )
}

export default Footer