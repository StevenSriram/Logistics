// Login.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState({email: "", pass: ""});
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    
    try {
      const form = document.querySelector('form')
      form.classList.add('was-validated')
      e.preventDefault();
      const res = await axios.post('http://localhost:5000/api/login', 
                                      user, {withCredentials: true})
      setUser({email: "", pass: ""})
      window.alert(res.data.msg)  

      if(res.data.msg === 'Login Success')
      {
        navigate('/') 
      }  
    }
    catch(err) {
      console.error(err)
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Login</h5>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="pass"
                    name="pass"
                    value={user.pass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
