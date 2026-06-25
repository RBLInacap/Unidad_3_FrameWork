import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './Dashboard.css'
import userService from '../services/userService'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    activeUsers: 0,
    coaches: 0,
    activeClasses: 0,
    todaysReservations: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await userService.getAll()
        const allUsers = (response.data || response) || []

        const activeUsers = allUsers.filter((user) => {
          const status = String(user.status || user.estado || 'activo').toLowerCase()
          return status !== 'inactive' && status !== 'inactivo'
        }).length

        const coaches = allUsers.filter((user) => user.role === 'coach').length

        const allClasses = allUsers.flatMap((user) => {
          const clases = Array.isArray(user.metadata?.clases) ? user.metadata.clases : []
          return clases.filter((clase) => clase.estado !== 'inactiva')
        })

        const today = new Date().toISOString().slice(0, 10)
        const todaysReservations = allUsers.flatMap((user) => {
          const reservas = Array.isArray(user.metadata?.reservas) ? user.metadata.reservas : []
          return reservas
        }).filter((reserva) => reserva.fecha === today).length

        setStats({
          activeUsers,
          coaches,
          activeClasses: allClasses.length,
          todaysReservations
        })
      } catch (error) {
        console.error('Error cargando estadísticas admin:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

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
                  <div className="stat-number">
                    {loading ? <Spinner animation="border" size="sm" /> : stats.activeUsers}
                  </div>
                  <Card.Text>Usuarios Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">
                    {loading ? <Spinner animation="border" size="sm" /> : stats.coaches}
                  </div>
                  <Card.Text>Coaches</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">
                    {loading ? <Spinner animation="border" size="sm" /> : stats.activeClasses}
                  </div>
                  <Card.Text>Clases Activas</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">
                    {loading ? <Spinner animation="border" size="sm" /> : stats.todaysReservations}
                  </div>
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
                  <div className="card-icon">⚽</div>
                  <Card.Title>Deportes</Card.Title>
                  <Card.Text>
                    Administra todos los deportes ofrecidos.
                  </Card.Text>
                  <Button 
                    className="btn-admin"
                    onClick={() => navigate('/dashboard/admin/deportes')}
                  >
                    Gestionar Deportes
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
