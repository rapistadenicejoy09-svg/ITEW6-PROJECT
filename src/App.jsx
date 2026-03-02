import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="student-profile" element={<ModulePage />} />
          <Route path="faculty-profile" element={<ModulePage />} />
          <Route path="events" element={<ModulePage />} />
          <Route path="scheduling" element={<ModulePage />} />
          <Route path="college-research" element={<ModulePage />} />
          <Route path="instructions" element={<ModulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
