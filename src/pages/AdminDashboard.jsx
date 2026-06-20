import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import UserManagement from '../components/UserManagement'
import './Dashboard.css'
import logoSportClub from '../../assets/logoSportClub.png'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-container admin-dashboard">
      <Header role="admin" />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Panel Administrativo</h1>
            <p className="text-muted">Gestiona todos los aspectos del sistema</p>
          </div>

          <Row className="mt-5 mb-5">
            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">128</div>
                  <Card.Text>Usuarios Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">45</div>
                  <Card.Text>Coaches</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">32</div>
                  <Card.Text>Clases Activas</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">156</div>
                  <Card.Text>Reservas Hoy</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <h3 className="mb-4">Gestión del Sistema</h3>
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">👥</div>
                  <Card.Title>Usuarios</Card.Title>
                  <Card.Text>
                    Administra todos los usuarios del sistema.
                  </Card.Text>
                  <Button 
                    className="btn-admin"
                    onClick={() => navigate('/dashboard/admin/usuarios')}
                  >
                    Gestionar Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">📊</div>
                  <Card.Title>Reportes</Card.Title>
                  <Card.Text>
                    Visualiza reportes del sistema.
                  </Card.Text>
                  <Button 
                    className="btn-admin"
                    onClick={() => navigate('/dashboard/admin/reportes')}
                  >
                    Ver Reportes
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="card-icon">⚙️</div>
                  <Card.Title>Configuración</Card.Title>
                  <Card.Text>
                    Ajusta los parámetros del sistema.
                  </Card.Text>
                  <Button 
                    className="btn-admin"
                    onClick={() => navigate('/dashboard/admin/configuracion')}
                  >
                    Ir a Configuración
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

export default AdminDashboard
