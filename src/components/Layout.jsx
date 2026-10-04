import { NavLink, Outlet } from 'react-router-dom'

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
