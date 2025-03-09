import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import brand from "../images/brand.svg";

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({ name: "", email: "", pass: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL + "/admin/verify", {
          withCredentials: true,
        });

        if (res.data.msg === "Access Grant") {
          window.alert(`${res.data.admin.name} = ${res.data.admin.email}`);
        } else {
          // window.alert(res.data.msg);
          navigate("/admin/login");
        }
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL + "/admin/register", admin);
      setAdmin({ name: "", email: "", pass: "" });
      window.alert(res.data.msg);
      if (res.data.msg !== "Fill all Data") navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="text-center my-3">
              <img src={brand} className="rounded" alt="logo" width="100" />
            </div>
            <div className="card shadow-lg rounded">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">
                  {" "}
                  Admin Regsiter{" "}
                </h1>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      name="name"
                      value={admin.name}
                      autoFocus
                      required
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Admin Name required</div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">
                      E-Mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      value={admin.email}
                      autoFocus
                      required
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Email is invalid</div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="pass">
                        Password
                      </label>
                    </div>
                    <input
                      id="pass"
                      type="password"
                      className="form-control"
                      name="pass"
                      value={admin.pass}
                      required
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Password is required</div>
                  </div>

                  <div className="d-flex align-items-center">
                    <button type="submit" className="btn btn-primary ms-auto">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-5 text-muted">
              Copyright &copy; 2017-2021 &mdash; Logitics
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminRegister;
