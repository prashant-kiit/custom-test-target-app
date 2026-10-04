import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to={from} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    login(username, password, remember)
      .then(() => navigate(from, { replace: true }))
      .catch((err) => {
        setStatus('error')
        setError(err.message)
      })
  }

  return (
    <div data-testid="login-page">
      <div className="page-header">
        <h1>Log in</h1>
        <p>Mock authentication for testing login flows, protected routes and session persistence.</p>
      </div>

      <div className="card" style={{ maxWidth: 420 }}>
        <p className="field-hint" data-testid="login-demo-hint">
          Demo credentials: <strong>demo</strong> / <strong>password123</strong>
        </p>

        {status === 'error' && (
          <div className="alert alert-danger" role="alert" data-testid="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="login-username-input"
              autoComplete="username"
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="login-password-input"
              autoComplete="current-password"
            />
          </div>
          <div className="field">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                data-testid="login-remember-checkbox"
              />
              {' '}Remember me (persist across browser restarts)
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'submitting'}
            data-testid="login-submit-button"
          >
            {status === 'submitting' ? <span className="spinner" aria-hidden="true" /> : null}
            {status === 'submitting' ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
