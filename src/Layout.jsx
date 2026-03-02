import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const MODULES = [
  { id: 'student-profile', code: '1.1', title: 'Student Profile', path: '/student-profile' },
  { id: 'faculty-profile', code: '1.2', title: 'Faculty Profile', path: '/faculty-profile' },
  { id: 'events', code: '1.3', title: 'Events', path: '/events' },
  { id: 'scheduling', code: '1.4', title: 'Scheduling', path: '/scheduling' },
  { id: 'college-research', code: '1.5', title: 'College Research', path: '/college-research' },
  { id: 'instructions', code: '1.6', title: 'Instructions', path: '/instructions' },
]

export default function Layout() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">
            <img
              src="/ccs_logo.png"
              alt="CCS logo"
              className="logo-image"
            />
          </div>
          <div>
            <div className="app-title">Comprehensive Profiling System</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => 'nav-item' + (isActive ? ' nav-item-active' : '')}
          >
            Dashboard
          </NavLink>
          {MODULES.map((m) => (
            <NavLink
              key={m.id}
              to={m.path}
              className={({ isActive }) => 'nav-item' + (isActive ? ' nav-item-active' : '')}
            >
              {m.title}
            </NavLink>
          ))}
        </nav>

        
      </aside>

      <main className="main">
        <div className="main-header">
          <button
            type="button"
            className="mode-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? '☀ Light mode' : '☀ Dark mode'}
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
