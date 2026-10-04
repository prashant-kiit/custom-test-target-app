import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const TABS = [
  { id: 'overview', label: 'Overview', content: 'High-level summary content for the Overview tab.' },
  { id: 'activity', label: 'Activity', content: 'A list of recent activity would render here.' },
  { id: 'settings', label: 'Settings', content: 'Account and preference settings go in this tab.' },
]

const ITEMS = [
  { id: 'alpha', name: 'Alpha' },
  { id: 'beta', name: 'Beta' },
  { id: 'gamma', name: 'Gamma' },
]

function NavigationPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const navigate = useNavigate()

  return (
    <div data-testid="navigation-page">
      <div className="page-header">
        <h1>Navigation</h1>
        <p>Tabs (no URL change), nested routes with params, breadcrumbs and programmatic navigation.</p>
      </div>

      <div className="card">
        <h2>Tabs</h2>
        <div className="tabs" role="tablist" aria-label="Demo tabs" data-testid="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              className="tab-btn"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {TABS.map((tab) => (
          <div key={tab.id} role="tabpanel" hidden={activeTab !== tab.id} data-testid={`tabpanel-${tab.id}`}>
            {tab.content}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Nested routes with breadcrumbs</h2>
        <p className="field-hint">Each link below navigates to a nested route with a URL param.</p>
        <ul data-testid="navigation-items-list">
          {ITEMS.map((item) => (
            <li key={item.id}>
              <Link to={`/navigation/items/${item.id}`} data-testid={`navigation-item-link-${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Programmatic navigation</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => navigate('/table')} data-testid="goto-table-button">
            Go to Table page
          </button>
          <button className="btn" onClick={() => navigate(-1)} data-testid="go-back-button">
            Go back
          </button>
        </div>
      </div>

      <div className="card">
        <h2>External link</h2>
        <a href="https://playwright.dev" target="_blank" rel="noreferrer" data-testid="external-link">
          Open Playwright docs (new tab)
        </a>
      </div>
    </div>
  )
}

export default NavigationPage
