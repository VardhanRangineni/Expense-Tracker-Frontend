import React, { useState,useEffect } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const Header = ({role,setRole}) => {
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    const currentRole = localStorage.getItem("role");
    setRole(currentRole);
  },[navigate])
 
  const handleLogOut = () => {
    localStorage.setItem("role","ROLE_GUEST")
    setRole("ROLE_GUEST")
    navigate('/login')
  }

  const getPath = (item) => {
    const paths = {
      'HOME': '/',
      'DASHBOARD': '/dashboard',
      'MY SUBMISSIONS': '/my-submissions',
      'VIEW SUBMISSIONS': '/view-submissions',
      'REPORTS': '/reports',
      'HISTORY': '/history',
      'ADD MEMBER': '/add-member',
      'LOGIN': '/login'
    };
    return paths[item];
  };

  return (
    <nav>
      <div className="text-light bg-dark p-3 d-flex justify-content-evenly align-content-center">
        <h2>Expense Tracker</h2>
      

      {role === 'ROLE_EMPLOYEE' && (
         <div className='d-flex gap-3 ms-2 me-2'>
          {['HOME', 'MY SUBMISSIONS', 'HISTORY'].map(item => (
            <div key={item} >
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
          
        </div>
      )}

      {role === 'ROLE_MANAGER' && (
         <div className='d-flex gap-3 ms-2 me-2'>
          {['DASHBOARD', 'VIEW SUBMISSIONS'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
        </div>
      )}

      {role === 'ROLE_ADMIN' && (
        <div className='d-flex gap-3 ms-2 me-2'>
          {['HOME', 'DASHBOARD',  'VIEW SUBMISSIONS', 'REPORTS', 'ADD MEMBER'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
          
        </div>
      )}
        <div>
            <span
              onClick={handleLogOut}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              SIGNOUT
            </span>
          </div>
       </div>
    </nav>
  );
};

export default Header;