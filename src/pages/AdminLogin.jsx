import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminLogin() {
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

    const stored = localStorage.getItem('adminAccount')
    if (!stored) {
      setError('No admin account found. Please create an account first.')
      return
    }

    let account
    try {
      account = JSON.parse(stored)
    } catch {
      setError('Saved admin data is corrupted. Please recreate the admin account.')
      return
    }

    const email = form.email.trim()
    if (account.email !== email || account.password !== form.password) {
      setError('Invalid email or password.')
      return
    }

    const session = {
      email: account.email,
      fullName: account.fullName,
      loginAt: new Date().toISOString(),
    }

    localStorage.setItem('adminSession', JSON.stringify(session))
    navigate('/')
  }

  return (
    <div className="auth-page auth-page-admin">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/ccs_logo.png" alt="CCS logo" className="auth-logo-image" />
        </div>
        <h1 className="auth-title">Admin Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="auth-label">Email</span>
            <input
              className="auth-input"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.edu"
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Password</span>
            <input
              className="auth-input"
              type="password"
              name="password"
              autoComplete="current-password"
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

        <div className="auth-footer-text">
          <span>Need an account?</span>{' '}
          <Link to="/admin/create-account" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

