import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Sign-in/Login'
import ForgotPassword from '../pages/Sign-in/Forgot-Password'
import Dashboard from '../pages/Dashboard/Dashboard'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default Routers
