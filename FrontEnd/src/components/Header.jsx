import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const Header = () => {
  const navigate = useNavigate()

  return (
    <>
       <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top" id='navbar'>
        <div className="container-fluid">
        <Link to="/" className="navbar-brand">Logistics</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header" style={{borderBottom: '2px solid aqua'}}>
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Logitics</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Transport
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Road</a></li>
                    <li><a className="dropdown-item" href="#">Water</a></li>
                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li> */}
                    <li><a className="dropdown-item" href="#">Rail</a></li>
                    <li><a className="dropdown-item" href="#">Air</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
              {/* <form className="d-flex mt-2" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form> */}
              <button className="btn btn-outline-success mt-2" onClick={(e) => navigate('/login')}>Sign Up</button>

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header