import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

export default ProtectedRoute
