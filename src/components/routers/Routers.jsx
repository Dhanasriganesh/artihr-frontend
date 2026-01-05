import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Sign-in/Login'
import SignUp from '../pages/Sign-in/SignUp'
import ForgotPassword from '../pages/Sign-in/Forgot-Password'
import Dashboard from '../pages/Dashboard/Dashboard'
import Timesheet from '../pages/Timesheet/Timesheet'
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/timesheet" element={<Timesheet />} />
    </Routes>
  )
}
export default Routers
