import { useNavigate } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <Container>
          <div className="navbar-content">
            <h1 className="navbar-brand">⚽ SportClub</h1>
            <div className="navbar-buttons">
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
            </div>
          </div>
        </Container>
      </nav>

      <div className="home-hero">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="hero-text">
              <h2>Bienvenido a SportClub</h2>
              <p>Tu plataforma completa para gestionar tu comunidad deportiva</p>
              <div className="hero-buttons">
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
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <div className="hero-icon">⚽</div>
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
