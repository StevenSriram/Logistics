import React, { useEffect, useState } from 'react';

import { PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css'

const AdminDashBoard = () => {
    const [adminDetail,setAdminDetails] = useState({name: "", email: ""})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/verify', { withCredentials: true });
                
                if (res.data.msg === "Access Grant") {
                    setAdminDetails({ name : res.data.admin.name, email: res.data.admin.email})
                    console.log(`Welcome Admin`);
                } else {
                    // window.alert(res.data.msg);
                    navigate('/admin/login')
                }
            } catch (err) {
                console.error('Error fetching dashboard data', err);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
      try 
      {
          const res = await axios.post('http://localhost:5000/admin/logout', {}, { withCredentials: true });
          window.alert(res.data.msg);
          navigate('/admin/login');
      } 
      catch (err) 
      {
          console.error('Error logging out:', err);
      }
  };



  // Sample data for PieChart
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sample data for ScatterChart
  const scatterData = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
  ];

    return (
      <div className='admin-dashboard'>
        <nav className="navbar navbar-light bg-light d-lg-none">
            <div className="container-fluid py-3 px-4 text-info bg-dark d-flex justify-content-between">
            <h1>Admin DashBoard</h1>
            <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <div className="navbar-toggler-icon"></div>
            </button>
            </div>
        </nav>

        {/* <!-- Offcanvas Sidebar --> */}
        <div className="offcanvas text-primary bg-dark offcanvas-start d-lg-none" tabindex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
            <div className="offcanvas-header">
            <h5 className="offcanvas-title text-white" id="offcanvasSidebarLabel">Admin Logitics</h5>
            <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
            {/* <!-- Sidebar content here --> */}
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/admin/dashboard'>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/admin/add'>Add Vehicle</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Settings</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
            </div>
        </div>

        {/* <!-- Sidebar for large screens --> */}
        <div className="d-none d-lg-block" id="offcanvasSidebar">
            <h5>Admin Logistics</h5>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="#">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/admin/add'>Add Vehicle</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Settings</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>



        {/* <!-- Main content --> */}
        <div className="container mt-3">
            {/* User Info Box */}
            <div className="card mb-4">
                <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <p className="card-text"><strong>Name:</strong> {adminDetail.name}</p>
                <p className="card-text"><strong>Email:</strong> {adminDetail.email}</p>
                <p className="card-text"><strong>Role:</strong> {"Admin"}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mb-4">
                <h5>Pie Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={100} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Scatter Chart */}
            <div>
                <h5>Scatter Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="X-axis" />
                    <YAxis type="number" dataKey="y" name="Y-axis" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={scatterData} fill="#8884d8" />
                </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>



      </div>    
    );
}

export default AdminDashBoard;
