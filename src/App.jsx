import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import AdminLogin from './pages/AdminLogin'
import AdminCreateAccount from './pages/AdminCreateAccount'
import StudentLogin from './pages/StudentLogin'
import FacultyLogin from './pages/FacultyLogin'
import './App.css'

function RequireAuth() {
  const hasSession =
    Boolean(localStorage.getItem('adminSession')) ||
    Boolean(localStorage.getItem('studentSession')) ||
    Boolean(localStorage.getItem('facultySession'))

  return hasSession ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create-account" element={<AdminCreateAccount />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="student-profile" element={<ModulePage />} />
            <Route path="faculty-profile" element={<ModulePage />} />
            <Route path="events" element={<ModulePage />} />
            <Route path="scheduling" element={<ModulePage />} />
            <Route path="college-research" element={<ModulePage />} />
            <Route path="instructions" element={<ModulePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
