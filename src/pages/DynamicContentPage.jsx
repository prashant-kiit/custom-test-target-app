import { useEffect, useRef, useState } from 'react'

const CATALOG = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`)
let toastId = 0

function DynamicContentPage() {
  const [loadState, setLoadState] = useState('idle') // idle | loading | loaded
  const [loadedText, setLoadedText] = useState('')

  const [now, setNow] = useState(() => new Date())

  const [toasts, setToasts] = useState([])

  const [visibleCount, setVisibleCount] = useState(8)
  const [loadingMore, setLoadingMore] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const debounceRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const [delayedVisible, setDelayedVisible] = useState(false)

  const [flakyState, setFlakyState] = useState('idle') // idle | pending | success | error
  const flakyAttempt = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDelayedVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedTerm(searchTerm), 400)
    return () => clearTimeout(debounceRef.current)
  }, [searchTerm])

  function loadData() {
    setLoadState('loading')
    setTimeout(() => {
      setLoadedText('Fetched content from the mock API.')
      setLoadState('loaded')
    }, 1000)
  }

  function pushToast(type, message) {
    const id = toastId++
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  function loadMore() {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((c) => Math.min(CATALOG.length, c + 8))
      setLoadingMore(false)
    }, 600)
  }

  function startUpload() {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 10
        if (next >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return next
      })
    }, 200)
  }

  function runFlakyAction() {
    setFlakyState('pending')
    flakyAttempt.current += 1
    const willFail = flakyAttempt.current % 2 === 1
    setTimeout(() => {
      setFlakyState(willFail ? 'error' : 'success')
    }, 800)
  }

  const filteredCatalog = debouncedTerm.trim()
    ? CATALOG.filter((item) => item.toLowerCase().includes(debouncedTerm.trim().toLowerCase()))
    : CATALOG

  return (
    <div data-testid="dynamic-page">
      <div className="page-header">
        <h1>Dynamic Content</h1>
        <p>Loading states, toasts, polling, infinite content, debounced search and flaky actions.</p>
      </div>

      <div className="card">
        <h2>Load on demand</h2>
        <button className="btn btn-primary" onClick={loadData} disabled={loadState === 'loading'} data-testid="load-data-button">
          {loadState === 'loading' ? 'Loading…' : 'Load data'}
        </button>
        <div style={{ marginTop: 10 }}>
          {loadState === 'loading' && (
            <div data-testid="load-skeleton">
              <div className="skeleton" style={{ width: '80%', marginBottom: 6 }} />
              <div className="skeleton" style={{ width: '60%' }} />
            </div>
          )}
          {loadState === 'loaded' && <p data-testid="loaded-content">{loadedText}</p>}
        </div>
      </div>

      <div className="card">
        <h2>Live clock (polling demo)</h2>
        <p data-testid="live-clock" aria-live="polite">{now.toLocaleTimeString()}</p>
      </div>

      <div className="card">
        <h2>Toast notifications</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => pushToast('success', 'Saved successfully.')} data-testid="toast-success-button">
            Trigger success
          </button>
          <button className="btn" onClick={() => pushToast('danger', 'Something went wrong.')} data-testid="toast-error-button">
            Trigger error
          </button>
          <button className="btn" onClick={() => pushToast('info', 'Heads up: new update available.')} data-testid="toast-info-button">
            Trigger info
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Debounced search</h2>
        <input
          type="search"
          placeholder="Filter items…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="debounced-search-input"
          style={{ padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 4, minWidth: 220 }}
        />
        <p className="field-hint" data-testid="debounced-search-count">{filteredCatalog.length} matches</p>
      </div>

      <div className="card">
        <h2>Load more / infinite content</h2>
        <ul data-testid="catalog-list">
          {CATALOG.slice(0, visibleCount).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {visibleCount < CATALOG.length && (
          <button className="btn" onClick={loadMore} disabled={loadingMore} data-testid="load-more-button">
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        )}
      </div>

      <div className="card">
        <h2>Progress bar</h2>
        <button className="btn btn-primary" onClick={startUpload} disabled={uploading} data-testid="start-upload-button">
          {uploading ? 'Uploading…' : 'Start upload'}
        </button>
        <div className="progress-track" style={{ marginTop: 10 }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} data-testid="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="field-hint" data-testid="progress-value">{progress}%</p>
      </div>

      <div className="card">
        <h2>Appears after delay</h2>
        <p className="field-hint">This element becomes visible 3 seconds after the page loads.</p>
        {delayedVisible && (
          <div className="alert alert-info" data-testid="delayed-element">
            I appeared after a delay.
          </div>
        )}
      </div>

      <div className="card">
        <h2>Flaky action (fails every other attempt)</h2>
        <button className="btn btn-primary" onClick={runFlakyAction} disabled={flakyState === 'pending'} data-testid="flaky-action-button">
          {flakyState === 'pending' ? 'Working…' : 'Run flaky action'}
        </button>
        {flakyState === 'success' && (
          <p className="alert alert-success" data-testid="flaky-action-success">Succeeded.</p>
        )}
        {flakyState === 'error' && (
          <p className="alert alert-danger" data-testid="flaky-action-error">Failed. Try again.</p>
        )}
      </div>

      <div className="toast-stack" data-testid="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status" data-testid={`toast-${toast.id}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DynamicContentPage
