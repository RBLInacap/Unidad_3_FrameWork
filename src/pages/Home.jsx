import { useNavigate } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Swal from 'sweetalert2'
import './Home.css'
import logoSportClub from '../../assets/logoSportClub.png'
import richardImage from '../../assets/richard.png'

const Home = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

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
      }
    })
  }

  const getRolPath = () => {
    if (user?.role === 'admin') return '/dashboard/admin'
    if (user?.role === 'coach') return '/dashboard/coach'
    return '/dashboard/user'
  }

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <Container>
          <div className="navbar-content">
            <div className="navbar-brand navbar-brand-clickable" onClick={() => navigate('/')}>
              <img src={logoSportClub} alt="SportClub" className="navbar-logo" />
            </div>
            <div className="navbar-buttons">
              {isAuthenticated ? (
                <>
                  <span className="navbar-welcome">
                    👤 Bienvenid@, {user?.full_name || user?.firstName || 'Usuario'}
                  </span>
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate(getRolPath())}
                  >
                    Mi Dashboard
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleLogout}
                  >
                    🚪 Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => navigate('/register')}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>

      <div className="home-hero" style={{ backgroundImage: `url(${richardImage})` }}>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="hero-text">
              <h2>
                {isAuthenticated 
                  ? `¡Bienvenid@, ${user?.full_name?.split(' ')[0] || user?.firstName || 'Usuario'}!` 
                  : 'Bienvenid@ a SportClub'
                }
              </h2>
              <p>
                {isAuthenticated
                  ? 'Accede a tu panel para continuar'
                  : 'Tu plataforma completa para gestionar tu comunidad deportiva'
                }
              </p>
              <div className="hero-buttons">
                {isAuthenticated ? (
                  <>
                    <Button
                      size="lg"
                      onClick={() => navigate(getRolPath())}
                      className="btn-primary-hero"
                    >
                      Ir a Mi Dashboard
                    </Button>
                    <Button
                      size="lg"
                      variant="outline-light"
                      onClick={handleLogout}
                    >
                      🚪 Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => navigate('/register')}
                      className="btn-primary-hero"
                    >
                      Crear Cuenta
                    </Button>
                    <Button
                      size="lg"
                      variant="outline-light"
                      onClick={() => navigate('/login')}
                    >
                      Inicia Sesión
                    </Button>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <div className="hero-icon">🏋️‍♀️</div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="home-features">
        <Container>
          <h3>Características Principales</h3>
          <Row className="mt-5">
            <Col md={4} className="feature">
              <div className="feature-icon">👥</div>
              <h5>Gestión de Usuarios</h5>
              <p>Administra tu comunidad deportiva con facilidad</p>
            </Col>
            <Col md={4} className="feature">
              <div className="feature-icon">📅</div>
              <h5>Reservas de Clases</h5>
              <p>Organiza y reserva tus clases favoritas</p>
            </Col>
            <Col md={4} className="feature">
              <div className="feature-icon">📊</div>
              <h5>Reportes</h5>
              <p>Visualiza estadísticas de tu actividad</p>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="home-footer">
        <Container>
          <p>&copy; 2026 SportClub. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  )
}

export default Home
