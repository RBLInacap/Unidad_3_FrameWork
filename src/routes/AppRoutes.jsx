import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../contexts/AuthContext'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import UserDashboard from '../pages/UserDashboard'
import CoachDashboard from '../pages/CoachDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div>Cargando...</div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Ruta inicio */}
      <Route path="/" element={<Home />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas - Perfil */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas - Usuario */}
      <Route
        path="/dashboard/usuario"
        element={
          <ProtectedRoute allowedRoles={['usuario']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas - Coach */}
      <Route
        path="/dashboard/coach"
        element={
          <ProtectedRoute allowedRoles={['coach']}>
            <CoachDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas - Admin */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Página 404 - Debe ser la última */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
