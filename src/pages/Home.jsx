import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  { to: '/forms', title: 'Forms', desc: 'Text/email/password inputs, selects, radios, checkboxes, validation and async submit.' },
  { to: '/buttons', title: 'Buttons', desc: 'Click counters, disabled/loading states, toggles and button groups.' },
  { to: '/modals', title: 'Modals', desc: 'Confirm dialogs, form modals, nested modals and non-dismissible alerts.' },
  { to: '/dropdowns', title: 'Dropdowns', desc: 'Native selects, custom listbox, searchable autocomplete and multi-select chips.' },
  { to: '/table', title: 'Table', desc: 'Sorting, filtering, pagination and row selection over mock data.' },
  { to: '/dynamic', title: 'Dynamic Content', desc: 'Loading states, toasts, debounced search, polling, and flaky actions.' },
  { to: '/navigation', title: 'Navigation', desc: 'Tabs, breadcrumbs, nested routes and programmatic navigation.' },
]

function Home() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const timer = setTimeout(() => setStatus('online'), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div data-testid="home-page">
      <div className="page-header">
        <h1>Playwright Practice Target</h1>
        <p>
          A static, frontend-only sandbox with common UI patterns &mdash; forms, buttons, modals,
          dropdowns, tables, dynamic/async content and navigation &mdash; for writing and
          exercising Playwright end-to-end tests. All data on this site is simulated.
        </p>
        <p>
          App status:{' '}
          {status === 'loading' ? (
            <span className="badge badge-warning" data-testid="status-badge">checking&hellip;</span>
          ) : (
            <span className="badge badge-success" data-testid="status-badge">online</span>
          )}
        </p>
      </div>

      <div className="home-grid">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="home-card"
            data-testid={`home-card-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <h3>{section.title}</h3>
            <p>{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
