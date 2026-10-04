import { Link, useParams } from 'react-router-dom'

const ITEM_NAMES = {
  alpha: 'Alpha',
  beta: 'Beta',
  gamma: 'Gamma',
}

function NavigationDetail() {
  const { itemId } = useParams()
  const name = ITEM_NAMES[itemId] ?? itemId

  return (
    <div data-testid="navigation-detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb" data-testid="breadcrumbs">
        <Link to="/navigation">Navigation</Link>
        <span aria-hidden="true">/</span>
        <Link to="/navigation">Items</Link>
        <span aria-hidden="true">/</span>
        <span data-testid="breadcrumb-current">{name}</span>
      </nav>
      <h1 data-testid="navigation-detail-title">Item: {name}</h1>
      <p>This is the detail page for item id <code data-testid="navigation-detail-id">{itemId}</code>.</p>
      <Link to="/navigation" data-testid="back-to-navigation-link">Back to Navigation</Link>
    </div>
  )
}

export default NavigationDetail
