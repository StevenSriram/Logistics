import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import brand from '../images/brand.svg'

const AdminLogin = () => {
    const [admin, setAdmin] = useState({email: '', pass: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setAdmin({...admin, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
    
        try {
          const form = document.querySelector('form')
          form.classList.add('was-validated')
          e.preventDefault();
          const res = await axios.post('http://localhost:5000/admin/login', 
                                          admin, {withCredentials: true})
          setAdmin({email: "", pass: ""})
    
          if(res.data.msg === 'Login Success')
          {
            navigate('/admin/dashboard') 
          } 
        }
        catch(err) {
          console.error(err)
        }
      };

    return (
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-3">
                            <img src={brand} className='rounded' alt="logo" width="100"/>
                        </div>
                        <div className="card shadow-lg rounded">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4"> Admin Login</h1>
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                        <input id="email" type="email" className="form-control" 
                                        name="email" value={admin.email} autoFocus required onChange={handleChange}/>
                                        <div className="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="pass">Password</label>
                                        </div>
                                        <input id="pass" type="password" className="form-control" 
                                        name="pass" value={admin.pass} required onChange={handleChange}/>
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            Login
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
    )
}

export default AdminLogin