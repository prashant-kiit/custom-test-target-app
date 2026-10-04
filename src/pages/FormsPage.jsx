import { useState } from 'react'

const COUNTRIES = ['United States', 'United Kingdom', 'India', 'Germany', 'Japan', 'Brazil']
const INTERESTS = ['Automation', 'Design', 'Performance', 'Accessibility', 'Security']

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  age: '',
  bio: '',
  country: '',
  plan: 'basic',
  interests: [],
  experience: 3,
  startDate: '',
  resume: null,
  acceptTerms: false,
}

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }
  if (form.age !== '' && (Number(form.age) < 18 || Number(form.age) > 120)) {
    errors.age = 'Age must be between 18 and 120.'
  }
  if (!form.country) errors.country = 'Please select a country.'
  if (!form.acceptTerms) errors.acceptTerms = 'You must accept the terms to continue.'
  return errors
}

function FormsPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [submitted, setSubmitted] = useState(null)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleInterest(interest) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }
    setStatus('submitting')
    setTimeout(() => {
      setSubmitted({ ...form, resume: form.resume?.name ?? null })
      setStatus('success')
    }, 800)
  }

  function handleReset() {
    setForm(initialForm)
    setErrors({})
    setStatus('idle')
    setSubmitted(null)
  }

  return (
    <div data-testid="forms-page">
      <div className="page-header">
        <h1>Forms</h1>
        <p>A variety of input types with client-side validation and a simulated async submit.</p>
      </div>

      {status === 'success' && submitted && (
        <div className="alert alert-success" role="status" data-testid="form-success-alert">
          Submitted successfully! Registered <strong>{submitted.fullName}</strong> ({submitted.email}).
        </div>
      )}

      <form className="card" onSubmit={handleSubmit} noValidate data-testid="signup-form">
        <h2>Create account</h2>

        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            data-testid="input-full-name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <span className="field-error" id="fullName-error" data-testid="error-full-name">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            data-testid="input-email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className="field-error" data-testid="error-email">{errors.email}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              data-testid="input-password"
              aria-invalid={Boolean(errors.password)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => setShowPassword((s) => !s)}
              data-testid="toggle-password-visibility"
              aria-pressed={showPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <span className="field-error" data-testid="error-password">{errors.password}</span>
          )}
          <span className="field-hint">Minimum 8 characters.</span>
        </div>

        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            min="0"
            value={form.age}
            onChange={(e) => update('age', e.target.value)}
            data-testid="input-age"
          />
          {errors.age && <span className="field-error" data-testid="error-age">{errors.age}</span>}
        </div>

        <div className="field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={3}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            data-testid="input-bio"
          />
        </div>

        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            data-testid="select-country"
            aria-invalid={Boolean(errors.country)}
          >
            <option value="">Select a country&hellip;</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <span className="field-error" data-testid="error-country">{errors.country}</span>
          )}
        </div>

        <div className="field">
          <span>Plan</span>
          <div className="radio-group" role="radiogroup" aria-label="Plan" data-testid="radio-group-plan">
            {['basic', 'pro', 'enterprise'].map((plan) => (
              <label key={plan}>
                <input
                  type="radio"
                  name="plan"
                  value={plan}
                  checked={form.plan === plan}
                  onChange={() => update('plan', plan)}
                  data-testid={`radio-plan-${plan}`}
                />
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <span>Interests</span>
          <div className="checkbox-group" data-testid="checkbox-group-interests">
            {INTERESTS.map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  checked={form.interests.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                  data-testid={`checkbox-interest-${interest.toLowerCase()}`}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="experience">Experience level: {form.experience}</label>
          <input
            id="experience"
            type="range"
            min="1"
            max="5"
            value={form.experience}
            onChange={(e) => update('experience', Number(e.target.value))}
            data-testid="input-experience-range"
          />
        </div>

        <div className="field">
          <label htmlFor="startDate">Preferred start date</label>
          <input
            id="startDate"
            type="date"
            value={form.startDate}
            onChange={(e) => update('startDate', e.target.value)}
            data-testid="input-start-date"
          />
        </div>

        <div className="field">
          <label htmlFor="resume">Resume (mock upload)</label>
          <input
            id="resume"
            type="file"
            onChange={(e) => update('resume', e.target.files?.[0] ?? null)}
            data-testid="input-resume-upload"
          />
          {form.resume && (
            <span className="field-hint" data-testid="resume-file-name">Selected: {form.resume.name}</span>
          )}
        </div>

        <div className="field">
          <label>
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => update('acceptTerms', e.target.checked)}
              data-testid="checkbox-accept-terms"
            />
            {' '}I accept the terms and conditions
          </label>
          {errors.acceptTerms && (
            <span className="field-error" data-testid="error-accept-terms">{errors.acceptTerms}</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'submitting'}
            data-testid="submit-form-button"
          >
            {status === 'submitting' ? <span className="spinner" aria-hidden="true" /> : null}
            {status === 'submitting' ? 'Submitting…' : 'Create account'}
          </button>
          <button type="button" className="btn" onClick={handleReset} data-testid="reset-form-button">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormsPage
