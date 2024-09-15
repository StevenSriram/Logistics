import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashBoard = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/dashboard', { withCredentials: true });
                
                if (res.data.msg === "Access Grant") {
                    window.alert(`${res.data.admin.name} = ${res.data.admin.email}`);
                } else {
                    window.alert(res.data.msg);
                }
            } catch (err) {
                console.error('Error fetching dashboard data', err);
                window.alert('Failed to fetch dashboard data');
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate()
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
          window.alert('Error logging out. Please try again.');
      }
  };

    return (
      <>
        <h1 className="text-center">DASHBOARD</h1>
        <button className="btn btn-outline-warning" onClick={handleLogout}>Logout</button>
      </>
    );
}

export default AdminDashBoard;
