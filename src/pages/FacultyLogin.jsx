import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FacultyLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.dataset.theme = 'light'
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError('Please enter both your email and password.')
      return
    }

    const adminStored = localStorage.getItem('adminAccount')
    if (adminStored) {
      try {
        const admin = JSON.parse(adminStored)
        const adminEmail = (admin?.email || '').trim().toLowerCase()
        const input = form.email.trim().toLowerCase()
        if (adminEmail && adminEmail === input) {
          setError('No user found, incorrect login credentials')
          return
        }
      } catch {
        // ignore parse errors
      }
    }

    const session = {
      email: form.email.trim(),
      role: 'faculty',
      loginAt: new Date().toISOString(),
    }

    localStorage.setItem('facultySession', JSON.stringify(session))
    navigate('/')
  }

  return (
    <div className="auth-page auth-page-split auth-page-split-left">
      <div className="auth-card auth-card-tall">
        <div className="auth-logo">
          <img src="/ccs_logo.png" alt="CCS logo" className="auth-logo-image" />
        </div>
        <h1 className="auth-title">Faculty Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="auth-label">Faculty Email</span>
            <input
              className="auth-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="faculty@example.edu"
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Password</span>
            <input
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn btn-primary auth-submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

