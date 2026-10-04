import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div data-testid="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>A protected page only reachable while authenticated.</p>
      </div>

      <div className="card">
        <p data-testid="dashboard-welcome">
          Welcome back, <strong>{user?.username}</strong>.
        </p>
        <p className="field-hint" data-testid="dashboard-session-expiry">
          Session expires at {user ? new Date(user.expiresAt).toLocaleTimeString() : ''}
        </p>
        <button className="btn btn-danger" onClick={handleLogout} data-testid="dashboard-logout-button">
          Log out
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
