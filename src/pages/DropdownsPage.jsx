import { useEffect, useRef, useState } from 'react'

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew']
const ROLES = ['Admin', 'Editor', 'Viewer', 'Owner']
const SKILLS = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'SQL']

function CustomSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <div className="dropdown" ref={ref} data-testid="custom-select">
      <button
        type="button"
        className="btn dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-testid="custom-select-trigger"
      >
        {selected ?? 'Select a role…'}
        <span aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="dropdown-menu" role="listbox" data-testid="custom-select-menu">
          {ROLES.map((role) => (
            <li
              key={role}
              role="option"
              aria-selected={selected === role}
              onClick={() => {
                setSelected(role)
                setOpen(false)
              }}
              data-testid={`custom-select-option-${role.toLowerCase()}`}
            >
              {role}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Autocomplete() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(null)
  const ref = useRef(null)

  const matches = query.trim()
    ? FRUITS.filter((f) => f.toLowerCase().includes(query.toLowerCase()))
    : FRUITS

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <div className="dropdown" ref={ref} data-testid="autocomplete">
      <input
        type="text"
        placeholder="Search fruit…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setPicked(null)
        }}
        onFocus={() => setOpen(true)}
        data-testid="autocomplete-input"
        style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 4 }}
      />
      {open && matches.length > 0 && (
        <ul className="dropdown-menu" role="listbox" data-testid="autocomplete-menu">
          {matches.map((fruit) => (
            <li
              key={fruit}
              role="option"
              onClick={() => {
                setPicked(fruit)
                setQuery(fruit)
                setOpen(false)
              }}
              data-testid={`autocomplete-option-${fruit.toLowerCase()}`}
            >
              {fruit}
            </li>
          ))}
        </ul>
      )}
      {picked && <p className="field-hint" data-testid="autocomplete-picked">Picked: {picked}</p>}
    </div>
  )
}

function MultiSelectChips() {
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  function toggle(skill) {
    setSelected((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  return (
    <div className="dropdown" ref={ref} data-testid="multi-select-chips">
      <button
        type="button"
        className="btn dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-testid="multi-select-trigger"
      >
        {selected.length ? `${selected.length} selected` : 'Select skills…'}
        <span aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="dropdown-menu" role="listbox" aria-multiselectable="true" data-testid="multi-select-menu">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              role="option"
              aria-selected={selected.includes(skill)}
              onClick={() => toggle(skill)}
              data-testid={`multi-select-option-${skill.toLowerCase()}`}
            >
              {selected.includes(skill) ? '☑ ' : '☐ '}
              {skill}
            </li>
          ))}
        </ul>
      )}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }} data-testid="multi-select-chip-list">
          {selected.map((skill) => (
            <span key={skill} className="chip" data-testid={`chip-${skill.toLowerCase()}`}>
              {skill}
              <button type="button" onClick={() => toggle(skill)} aria-label={`Remove ${skill}`} data-testid={`chip-remove-${skill.toLowerCase()}`}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function DropdownsPage() {
  return (
    <div data-testid="dropdowns-page">
      <div className="page-header">
        <h1>Dropdowns</h1>
        <p>Native selects, a custom listbox, a searchable autocomplete, and a multi-select with chips.</p>
      </div>

      <div className="card">
        <h2>Native single select</h2>
        <select defaultValue="" data-testid="native-select">
          <option value="" disabled>
            Choose one…
          </option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </div>

      <div className="card">
        <h2>Native multi-select</h2>
        <select multiple size={4} data-testid="native-multi-select" style={{ minWidth: 200 }}>
          {FRUITS.slice(0, 5).map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="card">
        <h2>Custom listbox dropdown</h2>
        <CustomSelect />
      </div>

      <div className="card">
        <h2>Searchable autocomplete</h2>
        <Autocomplete />
      </div>

      <div className="card">
        <h2>Multi-select with chips</h2>
        <MultiSelectChips />
      </div>
    </div>
  )
}

export default DropdownsPage
