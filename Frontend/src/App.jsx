import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Home from './Components/HomePage/Home';
import Navbar from './Components/Navbar/AppNavbar'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Users from './Components/Employee/Users';
import CreateUser from './Components/Employee/CreateUser';
import UpdateUser from './Components/Employee/UpdateUser';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Welcome to the application!</div>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedRoute>
          <Users />
        </ProtectedRoute>} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;