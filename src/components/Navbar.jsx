import { Nav } from 'react-bootstrap'
import './Navbar.css'

const Navbar = ({ role }) => {
  const getNavItems = (role) => {
    const items = {
      usuario: [
        { label: 'Inicio', icon: '🏠' },
        { label: 'Mis Reservas', icon: '📅' },
        { label: 'Mi Perfil', icon: '👤' }
      ],
      coach: [
        { label: 'Inicio', icon: '🏠' },
        { label: 'Mis Alumnos', icon: '👥' },
        { label: 'Mis Clases', icon: '📚' },
        { label: 'Mi Perfil', icon: '👤' }
      ],
      admin: [
        { label: 'Inicio', icon: '🏠' },
        { label: 'Usuarios', icon: '👥' },
        { label: 'Reportes', icon: '📊' },
        { label: 'Configuración', icon: '⚙️' }
      ]
    }
    return items[role] || []
  }

  return (
    <Nav className={`navbar-custom navbar-${role}`}>
      {getNavItems(role).map((item, index) => (
        <Nav.Link key={index} className="nav-item">
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  )
}

export default Navbar
