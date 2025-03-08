import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import {BsFillEnvelopeFill} from 'react-icons/bs'
import { PiTruckFill } from "react-icons/pi";

const API_URL = "http://localhost:5000";

const Header = () => {
  // use the Context
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        API_URL + "/api/logout",
        {},
        { withCredentials: true }
      );
      setLogin(false);
      window.alert(res.data.msg);
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
      window.alert("Error logging out. Please try again.");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-md bg-body-tertiary fixed-top"
        id="navbar"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {" "}
            Logistics
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div
              className="offcanvas-header"
              style={{ borderBottom: "2px solid aqua" }}
            >
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                {" "}
                Logistics <PiTruckFill style={{ fontSize: "50px" }} />{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/transport">
                    Transport
                  </Link>
                </li>

                {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Transport
                    </Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className="dropdown-item" to="/transport">Road</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/water">Water</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/rail">Rail</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/air">Air</Link>
                        </li>
                    </ul>
                </li> */}

                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Contact
                  </Link>
                </li>
              </ul>
              {/* <form className="d-flex mt-2" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form> */}
              {!login ? (
                <button
                  className="btn btn-outline-success mt-2"
                  onClick={(e) => navigate("/login")}
                >
                  Sign Up
                </button>
              ) : (
                <>
                  <button className="btn btn-outline-danger mt-2 me-2 py-2">
                    Profile
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
