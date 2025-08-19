import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  const role = userRole || 'guest';

  const getNavigationItems = () => {
    const baseItems = [{ name: 'HOME', path: '/', roles: ['employee', 'manager', 'admin', 'guest'] }];
    const roleSpecificItems = {
      employee: [
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'MY SUBMISSIONS', path: '/my-submissions' },
        { name: 'HISTORY', path: '/history' }
      ],
      manager: [
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'MY SUBMISSIONS', path: '/my-submissions' },
        { name: 'VIEW SUBMISSIONS', path: '/view-submissions' },
        { name: 'REPORTS', path: '/reports' },
        { name: 'HISTORY', path: '/history' }
      ],
      admin: [
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'MY SUBMISSIONS', path: '/my-submissions' },
        { name: 'VIEW SUBMISSIONS', path: '/view-submissions' },
        { name: 'REPORTS', path: '/reports' },
        { name: 'HISTORY', path: '/history' },
        { name: 'ADD MEMBER', path: '/add-member' }
      ],
      guest: [
        { name: 'LOGIN', path: '/login' }
      ]
    };
    return [...baseItems, ...(roleSpecificItems[role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav>
      <div onClick={toggleNavbar} style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
        Medplus Expense Tracker
      </div>
      <ul style={{ display: isOpen ? 'block' : 'none', listStyleType: 'none', paddingLeft: 0 }}>
        {navigationItems.map(item => (
          <li key={item.name} style={{ marginBottom: '6px' }}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              onClick={closeNavbar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
        {role !== 'guest' && (
          <li>
            <span
              onClick={() => { closeNavbar(); console.log('Logout clicked'); }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              SIGNOUT
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;