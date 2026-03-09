import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'

const MODULES = [
  { id: 'student-profile', code: '1.1', title: 'Student Profile', path: '/student-profile' },
  { id: 'faculty-profile', code: '1.2', title: 'Faculty Profile', path: '/faculty-profile' },
  { id: 'events', code: '1.3', title: 'Events', path: '/events' },
  { id: 'scheduling', code: '1.4', title: 'Scheduling', path: '/scheduling' },
  { id: 'college-research', code: '1.5', title: 'College Research', path: '/college-research' },
  { id: 'instructions', code: '1.6', title: 'Instructions', path: '/instructions' },
]

export default function Layout() {
  const [theme, setTheme] = useState('light')
  const [userLabel, setUserLabel] = useState('')
  const [profilePath, setProfilePath] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.dataset.theme = theme
    let label = ''

    const adminSession = localStorage.getItem('adminSession')
    const studentSession = localStorage.getItem('studentSession')
    const facultySession = localStorage.getItem('facultySession')

    let path = null
    if (adminSession) {
      try {
        const parsed = JSON.parse(adminSession)
        if (parsed?.fullName) {
          label = `Admin: ${parsed.fullName}`
        } else if (parsed?.email) {
          label = `Admin: ${parsed.email}`
        }
        path = '/admin-profile'
      } catch {
        // ignore parse errors
      }
    } else if (studentSession) {
      try {
        const parsed = JSON.parse(studentSession)
        if (parsed?.idOrEmail) {
          label = `Student: ${parsed.idOrEmail}`
          path = '/student-profile'
        }
      } catch {
        // ignore parse errors
      }
    } else if (facultySession) {
      try {
        const parsed = JSON.parse(facultySession)
        if (parsed?.email) {
          label = `Faculty: ${parsed.email}`
          path = '/faculty-my-profile'
        }
      } catch {
        // ignore parse errors
      }
    }

    setUserLabel(label)
    setProfilePath(path)
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

        <div className="sidebar-footer">
          {userLabel && (
            <>
              <div className="footer-title">Signed in as</div>
              {profilePath ? (
                <Link to={profilePath} className="footer-user footer-user-link">
                  {userLabel}
                </Link>
              ) : (
                <div className="footer-user">{userLabel}</div>
              )}
            </>
          )}
        </div>
      </aside>

      <main className="main">
        <div className="main-header">
          <div className="header-actions">
            <button
              type="button"
              className="mode-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? '☀ Light mode' : '☀ Dark mode'}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-compact"
              onClick={() => {
                localStorage.removeItem('adminSession')
                localStorage.removeItem('studentSession')
                localStorage.removeItem('facultySession')
                navigate('/admin/login')
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
