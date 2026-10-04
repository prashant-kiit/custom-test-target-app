import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div data-testid="not-found-page">
      <h1>404 &mdash; Page not found</h1>
      <p>The page you're looking for doesn't exist in this practice app.</p>
      <Link to="/" data-testid="not-found-home-link">Back to home</Link>
    </div>
  )
}

export default NotFound
