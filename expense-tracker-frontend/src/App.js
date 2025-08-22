import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/common/header';
import Login from './pages/login';
import EmployeeHome from './pages/Employee/AddSubmission';
import MySubmissions from './pages/Employee/MySubmissions';
import ViewSubmissions from './pages/Manager/ViewSubmissions';
import Dashboard from './pages/Dashboard';
import AddMember from './pages/Admin/AddMember';

function App() {
  
  const [currRole,setCurrRole] = useState("ROLE_ANONYMOUS");
  
    useEffect(()=>{
      const currentRole = localStorage.getItem("role");
      
      setCurrRole(currentRole);
    },[])
  
  return (
    <Router>
      <Header role={currRole} setRole={setCurrRole} />
      
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route path="/login" element={currRole==="ROLE_ANONYMOUS" ? <Login setRole={setCurrRole}/> : <Navigate to="/dashboard"/>}  />
          <Route path="/dashboard" element={currRole!=="ROLE_ANONYMOUS" ? <Dashboard currRole={currRole}/> : <Navigate to="/login"/>}/>

          <Route path="/add-submission" element={currRole==="ROLE_EMPLOYEE"? <EmployeeHome/> : <Navigate to="/login"/>} />
          <Route path="/my-submissions" element={currRole==="ROLE_EMPLOYEE"? <MySubmissions/> : <Navigate to="/login"/>} />
          <Route path="/view-submissions" element={currRole==="ROLE_MANAGER"? <ViewSubmissions/> : <Navigate to="/login"/>} />


          <Route path="/add-member" element={currRole==="ROLE_ADMIN"? <AddMember/> : <Navigate to="/login"/>} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          
        </Routes>
    </Router>
  );
}

export default App;
