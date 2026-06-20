import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const CoachDashboard = () => {
  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mi Dashboard Coach</h1>
            <p className="text-muted">Gestiona tu comunidad de alumnos</p>
          </div>

          <Row className="mt-5">
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">👥</div>
                  <Card.Title>Mis Alumnos</Card.Title>
                  <Card.Text>
                    Visualiza y gestiona la lista de tus alumnos.
                  </Card.Text>
                  <Button variant="success" className="btn-coach">
                    Ver Alumnos
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">📅</div>
                  <Card.Title>Mis Clases</Card.Title>
                  <Card.Text>
                    Organiza y programa tus clases.
                  </Card.Text>
                  <Button variant="success" className="btn-coach">
                    Ver Clases
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">📊</div>
                  <Card.Title>Reportes</Card.Title>
                  <Card.Text>
                    Visualiza reportes de asistencia y desempeño.
                  </Card.Text>
                  <Button variant="success" className="btn-coach">
                    Ver Reportes
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">💬</div>
                  <Card.Title>Mensajes</Card.Title>
                  <Card.Text>
                    Comunícate con tus alumnos.
                  </Card.Text>
                  <Button variant="success" className="btn-coach">
                    Ver Mensajes
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

export default CoachDashboard
