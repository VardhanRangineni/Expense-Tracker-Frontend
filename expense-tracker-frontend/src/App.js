import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/common/header';
import Login from './pages/login';
import EmployeeHome from './pages/Employee/EmployeeHome';
import MySubmissions from './pages/Employee/MySubmissions';

function App() {
  
  const [currRole,setCurrRole] = useState("ROLE_GUEST");
  
    useEffect(()=>{
      const currentRole = localStorage.getItem("role");
      setCurrRole(currentRole);
    },[])
  
  return (
    <Router>
      <Header role={currRole} setRole={setCurrRole} />
      
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setRole={setCurrRole}/>} />
          <Route path="/dashboard" element={currRole=="ROLE_EMPLOYEE"? <EmployeeHome /> : <Navigate to="/login"/>} />
          <Route path="/my-submissions" element={currRole=="ROLE_EMPLOYEE"? <MySubmissions /> : <Navigate to="/login"/>} />
          
        </Routes>
    </Router>
  );
}

export default App;
