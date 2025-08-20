import React, { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const Header = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const role = userRole || 'guest';

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
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}
      >
        Expense Tracker
      </div>

      {isOpen && role === 'ROLE_EMPLOYEE' && (
        <div>
          {['HOME', 'MY SUBMISSIONS', 'HISTORY'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
          <div>
            <span
              onClick={() => {
                setIsOpen(false);
                console.log('Logout clicked');
                navigate('/login')
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              SIGNOUT
            </span>
          </div>
        </div>
      )}

      {isOpen && role === 'ROLE_MANAGER' && (
        <div>
          {['HOME', 'DASHBOARD', 'VIEW SUBMISSIONS', 'REPORTS'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
          <div>
            <span
              onClick={() => {
                setIsOpen(false);
                console.log('Logout clicked');
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              SIGNOUT
            </span>
          </div>
        </div>
      )}

      {isOpen && role === 'ROLE_ADMIN' && (
        <div>
          {['HOME', 'DASHBOARD', 'MY SUBMISSIONS', 'VIEW SUBMISSIONS', 'REPORTS', 'HISTORY', 'ADD MEMBER'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
          <div>
            <span
              onClick={() => {
                setIsOpen(false);
                console.log('Logout clicked');
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              SIGNOUT
            </span>
          </div>
        </div>
      )}

      {isOpen && role === 'guest' && (
        <div>
          {['HOME', 'LOGIN'].map(item => (
            <div key={item} style={{ marginBottom: '6px' }}>
              <NavLink
                to={getPath(item)}
                end={item === 'HOME'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {item}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;