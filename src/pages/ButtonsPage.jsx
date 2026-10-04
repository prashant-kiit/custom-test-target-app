import { useState } from 'react'

function ButtonsPage() {
  const [count, setCount] = useState(0)
  const [disabledToggle, setDisabledToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [actionDone, setActionDone] = useState(false)
  const [liked, setLiked] = useState(false)
  const [dblClicks, setDblClicks] = useState(0)
  const [selectedSize, setSelectedSize] = useState('md')
  const [contextMenu, setContextMenu] = useState(null)

  function runAsyncAction() {
    setLoading(true)
    setActionDone(false)
    setTimeout(() => {
      setLoading(false)
      setActionDone(true)
    }, 1200)
  }

  function openContextMenu(e) {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <div data-testid="buttons-page" onClick={() => contextMenu && setContextMenu(null)}>
      <div className="page-header">
        <h1>Buttons</h1>
        <p>Click counters, disabled/loading states, toggles, button groups and right-click menus.</p>
      </div>

      <div className="card">
        <h2>Click counter</h2>
        <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)} data-testid="counter-button">
          Clicked {count} time{count === 1 ? '' : 's'}
        </button>
      </div>

      <div className="card">
        <h2>Disabled state</h2>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          <input
            type="checkbox"
            checked={disabledToggle}
            onChange={(e) => setDisabledToggle(e.target.checked)}
            data-testid="checkbox-disable-target"
          />
          Disable the button below
        </label>
        <button className="btn" disabled={disabledToggle} data-testid="disableable-button">
          Submit
        </button>
      </div>

      <div className="card">
        <h2>Async action with loading state</h2>
        <button
          className="btn btn-primary"
          onClick={runAsyncAction}
          disabled={loading}
          data-testid="async-action-button"
        >
          {loading ? <span className="spinner" aria-hidden="true" /> : null}
          {loading ? 'Processing…' : 'Run action'}
        </button>
        {actionDone && (
          <p className="field-hint" data-testid="async-action-result">Action completed.</p>
        )}
      </div>

      <div className="card">
        <h2>Toggle button</h2>
        <button
          className="btn"
          aria-pressed={liked}
          onClick={() => setLiked((v) => !v)}
          data-testid="like-toggle-button"
        >
          {liked ? '♥ Liked' : '♡ Like'}
        </button>
      </div>

      <div className="card">
        <h2>Double-click action</h2>
        <button className="btn" onDoubleClick={() => setDblClicks((c) => c + 1)} data-testid="double-click-button">
          Double-click me
        </button>
        <p className="field-hint" data-testid="double-click-count">Double-clicked {dblClicks} time{dblClicks === 1 ? '' : 's'}</p>
      </div>

      <div className="card">
        <h2>Button group (exclusive selection)</h2>
        <div role="group" aria-label="Size" data-testid="button-group-size" style={{ display: 'flex', gap: 6 }}>
          {['sm', 'md', 'lg'].map((size) => (
            <button
              key={size}
              className="btn"
              aria-pressed={selectedSize === size}
              onClick={() => setSelectedSize(size)}
              data-testid={`size-button-${size}`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Right-click context menu</h2>
        <div
          onContextMenu={openContextMenu}
          data-testid="context-menu-target"
          style={{
            border: '1px dashed var(--color-border)',
            borderRadius: 8,
            padding: 24,
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          Right-click inside this box
        </div>
        {contextMenu && (
          <ul
            role="menu"
            data-testid="context-menu"
            style={{
              position: 'fixed',
              top: contextMenu.y,
              left: contextMenu.x,
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              boxShadow: 'var(--shadow-md)',
              listStyle: 'none',
              padding: 4,
              margin: 0,
              zIndex: 50,
            }}
          >
            {['Copy', 'Paste', 'Delete'].map((action) => (
              <li key={action} role="menuitem" data-testid={`context-menu-item-${action.toLowerCase()}`} style={{ padding: '6px 14px', cursor: 'pointer' }}>
                {action}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ButtonsPage
