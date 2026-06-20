import { useNavigate } from 'react-router-dom'
import { Navbar as BootstrapNavbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Swal from 'sweetalert2'
import logoSportClub from '../../assets/logoSportClub.png'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Deseas cerrar tu sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
          timer: 1500,
          showConfirmButton: false
        })
        navigate('/login')
      }
    })
  }

  return (
    <BootstrapNavbar className={`dashboard-header header-${user?.role}`} sticky="top">
      <Container>
        <BootstrapNavbar.Brand className="fw-bold d-flex align-items-center header-brand-clickable" onClick={() => navigate('/')}>
          <img src={logoSportClub} alt="SportClub" className="header-logo" />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Collapse className="justify-content-end">
          <div className="header-actions">
            <span className="user-name">
              👤 Bienvenido, {user?.full_name || user?.firstName || 'Usuario'}
            </span>
            <Button
              variant="outline-light"
              size="sm"
              className="me-2"
              onClick={() => navigate('/profile')}
            >
              Mi Perfil
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLogout}
            >
              🚪 Cerrar Sesión
            </Button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Header
