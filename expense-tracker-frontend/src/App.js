import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/common/header';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';

function App() {
  // Add state to manage user role
  const [userRole, setUserRole] = useState('guest');

  return (
    <Router>
      <Header userRole={userRole} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
