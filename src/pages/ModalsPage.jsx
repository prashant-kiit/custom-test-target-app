import { useState } from 'react'

function Modal({ titleId, children, onClose, testId }) {
  return (
    <div
      className="modal-overlay"
      data-testid={`${testId}-overlay`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} data-testid={testId}>
        {children}
      </div>
    </div>
  )
}

function ModalsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmResult, setConfirmResult] = useState(null)

  const [formOpen, setFormOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(null)

  const [parentOpen, setParentOpen] = useState(false)
  const [childOpen, setChildOpen] = useState(false)

  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <div data-testid="modals-page">
      <div className="page-header">
        <h1>Modals</h1>
        <p>Confirm dialogs, form modals, nested modals and a non-dismissible alert.</p>
      </div>

      <div className="card">
        <h2>Confirm dialog</h2>
        <button className="btn btn-primary" onClick={() => setConfirmOpen(true)} data-testid="open-confirm-modal">
          Delete item
        </button>
        {confirmResult && (
          <p className="field-hint" data-testid="confirm-result">Last action: {confirmResult}</p>
        )}
      </div>

      <div className="card">
        <h2>Form modal</h2>
        <button className="btn btn-primary" onClick={() => setFormOpen(true)} data-testid="open-form-modal">
          Add contact
        </button>
        {formSubmitted && (
          <div className="alert alert-success" data-testid="form-modal-result">
            Added contact: {formSubmitted}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Nested modals</h2>
        <button className="btn btn-primary" onClick={() => setParentOpen(true)} data-testid="open-parent-modal">
          Open parent modal
        </button>
      </div>

      <div className="card">
        <h2>Non-dismissible alert</h2>
        <button className="btn btn-primary" onClick={() => setAlertOpen(true)} data-testid="open-alert-modal">
          Trigger important alert
        </button>
      </div>

      {confirmOpen && (
        <Modal titleId="confirm-title" testId="confirm-modal" onClose={() => setConfirmOpen(false)}>
          <h2 id="confirm-title">Delete item?</h2>
          <p>This action cannot be undone.</p>
          <div className="modal-actions">
            <button
              className="btn"
              onClick={() => {
                setConfirmOpen(false)
                setConfirmResult('cancelled')
              }}
              data-testid="confirm-modal-cancel"
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setConfirmOpen(false)
                setConfirmResult('deleted')
              }}
              data-testid="confirm-modal-confirm"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {formOpen && (
        <Modal titleId="form-modal-title" testId="form-modal" onClose={() => setFormOpen(false)}>
          <h2 id="form-modal-title">Add contact</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setFormSubmitted(formName)
              setFormOpen(false)
              setFormName('')
            }}
          >
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                data-testid="form-modal-name-input"
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setFormOpen(false)} data-testid="form-modal-cancel">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" data-testid="form-modal-submit">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {parentOpen && (
        <Modal titleId="parent-modal-title" testId="parent-modal" onClose={() => setParentOpen(false)}>
          <h2 id="parent-modal-title">Parent modal</h2>
          <p>You can open another modal on top of this one.</p>
          <div className="modal-actions">
            <button className="btn" onClick={() => setParentOpen(false)} data-testid="parent-modal-close">
              Close
            </button>
            <button className="btn btn-primary" onClick={() => setChildOpen(true)} data-testid="open-child-modal">
              Open child modal
            </button>
          </div>
        </Modal>
      )}

      {childOpen && (
        <Modal titleId="child-modal-title" testId="child-modal" onClose={() => setChildOpen(false)}>
          <h2 id="child-modal-title">Child modal</h2>
          <p>This modal is nested on top of the parent modal.</p>
          <div className="modal-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setChildOpen(false)
                setParentOpen(false)
              }}
              data-testid="child-modal-close-all"
            >
              Close all
            </button>
          </div>
        </Modal>
      )}

      {alertOpen && (
        <Modal titleId="alert-modal-title" testId="alert-modal">
          <h2 id="alert-modal-title">Action required</h2>
          <p>You must acknowledge this message before continuing.</p>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={() => setAlertOpen(false)} data-testid="alert-modal-acknowledge">
              Acknowledge
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ModalsPage
