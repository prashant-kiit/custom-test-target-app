import { useMemo, useState } from 'react'
import { MOCK_USERS } from '../data/mockUsers.js'

const PAGE_SIZES = [5, 10, 20]

function statusBadgeClass(status) {
  if (status === 'active') return 'badge badge-success'
  if (status === 'invited') return 'badge badge-warning'
  return 'badge badge-danger'
}

function TablePage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState(new Set())

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const rows = term
      ? MOCK_USERS.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term))
      : MOCK_USERS.slice()
    rows.sort((a, b) => {
      const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]))
      return sortDir === 'asc' ? cmp : -cmp
    })
    return rows
  }, [search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function changeSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function toggleRow(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAllOnPage() {
    const pageIds = pageRows.map((r) => r.id)
    const allSelected = pageIds.every((id) => selected.has(id))
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id))
      } else {
        pageIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))

  function columnHeader(key, label) {
    const active = sortKey === key
    return (
      <th
        onClick={() => changeSort(key)}
        data-testid={`th-${key}`}
        aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        {label} {active ? (sortDir === 'asc' ? '▲' : '▼') : ''}
      </th>
    )
  }

  return (
    <div data-testid="table-page">
      <div className="page-header">
        <h1>Table</h1>
        <p>Sortable, filterable, paginated table with row selection over {MOCK_USERS.length} mock users.</p>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            type="search"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            data-testid="table-search-input"
            style={{ padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 4, minWidth: 220 }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Rows per page:
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
              data-testid="table-page-size-select"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <span className="field-hint" data-testid="table-result-count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
        </div>

        {selected.size > 0 && (
          <div className="alert alert-info" data-testid="bulk-action-bar">
            {selected.size} row{selected.size === 1 ? '' : 's'} selected
            <button className="btn" style={{ marginLeft: 12 }} onClick={() => setSelected(new Set())} data-testid="clear-selection-button">
              Clear selection
            </button>
          </div>
        )}

        <table data-testid="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={toggleAllOnPage}
                  aria-label="Select all rows on this page"
                  data-testid="select-all-checkbox"
                />
              </th>
              {columnHeader('name', 'Name')}
              {columnHeader('email', 'Email')}
              {columnHeader('role', 'Role')}
              {columnHeader('status', 'Status')}
              {columnHeader('joined', 'Joined')}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((user) => (
              <tr key={user.id} data-testid={`table-row-${user.id}`}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(user.id)}
                    onChange={() => toggleRow(user.id)}
                    aria-label={`Select ${user.name}`}
                    data-testid={`row-checkbox-${user.id}`}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={statusBadgeClass(user.status)} data-testid={`status-badge-${user.id}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joined}</td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)' }} data-testid="table-empty-state">
                  No matching users.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination" data-testid="table-pagination">
          <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} data-testid="pagination-prev">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className="btn"
              aria-current={p === currentPage}
              onClick={() => setPage(p)}
              data-testid={`pagination-page-${p}`}
            >
              {p}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="pagination-next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TablePage
