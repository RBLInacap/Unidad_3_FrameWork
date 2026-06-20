import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const UserDashboard = () => {
  return (
    <div className="dashboard-container user-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="usuario" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mi Dashboard</h1>
            <p className="text-muted">Bienvenido a tu panel de usuario</p>
          </div>

          <Row className="mt-5">
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">📅</div>
                  <Card.Title>Mis Reservas</Card.Title>
                  <Card.Text>
                    Visualiza y gestiona todas tus reservas de clases.
                  </Card.Text>
                  <Button variant="primary" className="btn-user">
                    Ver Reservas
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">🏆</div>
                  <Card.Title>Mi Progreso</Card.Title>
                  <Card.Text>
                    Sigue tu progreso en las actividades deportivas.
                  </Card.Text>
                  <Button variant="primary" className="btn-user">
                    Ver Progreso
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">👥</div>
                  <Card.Title>Comunidad</Card.Title>
                  <Card.Text>
                    Conecta con otros usuarios y comparte experiencias.
                  </Card.Text>
                  <Button variant="primary" className="btn-user">
                    Ver Comunidad
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">📊</div>
                  <Card.Title>Estadísticas</Card.Title>
                  <Card.Text>
                    Visualiza tus estadísticas personales.
                  </Card.Text>
                  <Button variant="primary" className="btn-user">
                    Ver Estadísticas
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default UserDashboard
