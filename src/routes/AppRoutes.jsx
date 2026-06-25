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
// Importar páginas de usuario
import Reservas from '../pages/user/Reservas'
import Progreso from '../pages/user/Progreso'
import Comunidad from '../pages/user/Comunidad'
// Importar páginas de coach
import Alumnos from '../pages/coach/Alumnos'
import Clases from '../pages/coach/Clases'
import Reportes from '../pages/coach/Reportes'
// Importar páginas de admin
import Usuarios from '../pages/admin/Usuarios'
import CrearUsuario from '../pages/admin/CrearUsuario'
import ReportesAdmin from '../pages/admin/Reportes'
import Configuracion from '../pages/admin/Configuracion'
import Deportes from '../pages/admin/Deportes'

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
        path="/dashboard/user"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user/reservas"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Reservas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user/progreso"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Progreso />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user/comunidad"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Comunidad />
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
      <Route
        path="/dashboard/coach/alumnos"
        element={
          <ProtectedRoute allowedRoles={['coach']}>
            <Alumnos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/coach/clases"
        element={
          <ProtectedRoute allowedRoles={['coach']}>
            <Clases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/coach/reportes"
        element={
          <ProtectedRoute allowedRoles={['coach']}>
            <Reportes />
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
      <Route
        path="/dashboard/admin/usuarios"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Usuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/usuarios/crear"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CrearUsuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/reportes"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ReportesAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/configuracion"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Configuracion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/deportes"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Deportes />
          </ProtectedRoute>
        }
      />

      {/* Página 404 - Debe ser la última */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
