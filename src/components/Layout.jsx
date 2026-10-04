import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/forms', label: 'Forms' },
  { to: '/buttons', label: 'Buttons' },
  { to: '/modals', label: 'Modals' },
  { to: '/dropdowns', label: 'Dropdowns' },
  { to: '/table', label: 'Table' },
  { to: '/dynamic', label: 'Dynamic Content' },
  { to: '/navigation', label: 'Navigation' },
]

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <nav className="site-nav" aria-label="Primary">
        <div className="site-nav-inner">
          <NavLink to="/" className="site-nav-brand" data-testid="brand-link">
            PW Practice Target
          </NavLink>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/dashboard" data-testid="nav-link-dashboard">
            Dashboard
          </NavLink>
          {user ? (
            <>
              <span className="badge badge-success" data-testid="nav-user-badge">
                {user.username}
              </span>
              <button type="button" className="btn" onClick={handleLogout} data-testid="nav-logout-button">
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" data-testid="nav-link-login">
              Log in
            </NavLink>
          )}
        </div>
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        Static practice target for Playwright E2E tests &mdash; all data is mocked.
      </footer>
    </>
  )
}

export default Layout
