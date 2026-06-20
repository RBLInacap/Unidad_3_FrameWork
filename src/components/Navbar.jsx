import { useNavigate, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './Navbar.css'

const Navbar = ({ role }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const getNavItems = (role) => {
    const items = {
      usuario: [
        { label: 'Inicio', icon: '🏠', path: '/dashboard/user' },
        { label: 'Mis Reservas', icon: '📅', path: '/dashboard/user/reservas' },
        { label: 'Mi Progreso', icon: '🏆', path: '/dashboard/user/progreso' },
        { label: 'Comunidad', icon: '👥', path: '/dashboard/user/comunidad' }
      ],
      coach: [
        { label: 'Inicio', icon: '🏠', path: '/dashboard/coach' },
        { label: 'Mis Alumnos', icon: '👥', path: '/dashboard/coach/alumnos' },
        { label: 'Mis Clases', icon: '📚', path: '/dashboard/coach/clases' },
        { label: 'Reportes', icon: '📊', path: '/dashboard/coach/reportes' }
      ],
      admin: [
        { label: 'Inicio', icon: '🏠', path: '/dashboard/admin' },
        { label: 'Usuarios', icon: '👥', path: '/dashboard/admin/usuarios' },
        { label: 'Reportes', icon: '📊', path: '/dashboard/admin/reportes' },
        { label: 'Configuración', icon: '⚙️', path: '/dashboard/admin/configuracion' }
      ]
    }
    return items[role] || []
  }

  const isActive = (path) => location.pathname === path

  return (
    <Nav className={`navbar-custom navbar-${role}`}>
      {getNavItems(role).map((item, index) => (
        <Nav.Link
          key={index}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
          style={{ cursor: 'pointer' }}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  )
}

export default Navbar
