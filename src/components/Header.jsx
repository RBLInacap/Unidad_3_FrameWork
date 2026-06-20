import { useNavigate } from 'react-router-dom'
import { Navbar as BootstrapNavbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Swal from 'sweetalert2'
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
    <BootstrapNavbar className="dashboard-header" sticky="top">
      <Container>
        <BootstrapNavbar.Brand className="fw-bold">
          <span className="logo-icon">⚽</span> SportClub
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Collapse className="justify-content-end">
          <div className="header-actions">
            <span className="user-name me-3">
              Hola, {user?.firstName}
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
              Cerrar Sesión
            </Button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Header
