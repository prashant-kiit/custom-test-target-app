import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import FormsPage from './pages/FormsPage.jsx'
import ButtonsPage from './pages/ButtonsPage.jsx'
import ModalsPage from './pages/ModalsPage.jsx'
import DropdownsPage from './pages/DropdownsPage.jsx'
import TablePage from './pages/TablePage.jsx'
import DynamicContentPage from './pages/DynamicContentPage.jsx'
import NavigationPage from './pages/NavigationPage.jsx'
import NavigationDetail from './pages/NavigationDetail.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="forms" element={<FormsPage />} />
            <Route path="buttons" element={<ButtonsPage />} />
            <Route path="modals" element={<ModalsPage />} />
            <Route path="dropdowns" element={<DropdownsPage />} />
            <Route path="table" element={<TablePage />} />
            <Route path="dynamic" element={<DynamicContentPage />} />
            <Route path="navigation" element={<NavigationPage />} />
            <Route path="navigation/items/:itemId" element={<NavigationDetail />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
