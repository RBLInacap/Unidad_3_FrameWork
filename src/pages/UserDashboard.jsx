import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './Dashboard.css'
import logoSportClub from '../../assets/logoSportClub.png'

const UserDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-container user-dashboard">
      <Header role="usuario" />
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
                  <Button 
                    className="btn-user"
                    onClick={() => navigate('/dashboard/user/reservas')}
                  >
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
                  <Button 
                    className="btn-user"
                    onClick={() => navigate('/dashboard/user/progreso')}
                  >
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
                  <Button 
                    className="btn-user"
                    onClick={() => navigate('/dashboard/user/comunidad')}
                  >
                    Ver Comunidad
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
