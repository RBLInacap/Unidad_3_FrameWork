import { Container, Table, Button, Card, Row, Col, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Reservas = () => {
  const reservas = [
    {
      id: 1,
      clase: 'Yoga Matutino',
      coach: 'Juan Pérez',
      fecha: '2024-01-25',
      hora: '07:00',
      duracion: '60 min',
      estado: 'confirmada'
    },
    {
      id: 2,
      clase: 'CrossFit',
      coach: 'María García',
      fecha: '2024-01-26',
      hora: '18:00',
      duracion: '45 min',
      estado: 'confirmada'
    },
    {
      id: 3,
      clase: 'Pilates',
      coach: 'Carlos López',
      fecha: '2024-01-27',
      hora: '10:00',
      duracion: '50 min',
      estado: 'pendiente'
    }
  ]

  const handleCancelar = (id) => {
    Swal.fire({
      title: '¿Cancelar reserva?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelada', 'Reserva cancelada correctamente', 'success')
      }
    })
  }

  const getEstadoBadge = (estado) => {
    if (estado === 'confirmada') return <Badge bg="success">Confirmada</Badge>
    if (estado === 'pendiente') return <Badge bg="warning">Pendiente</Badge>
    return <Badge bg="danger">Cancelada</Badge>
  }

  return (
    <div className="dashboard-container user-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="usuario" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Reservas</h1>
            <p className="text-muted">Gestiona tus reservas de clases</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">3</div>
                  <Card.Text>Reservas Activas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">15</div>
                  <Card.Text>Clases Completadas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">25</div>
                  <Card.Text>Horas de Entrenamiento</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-primary text-white">
              <Card.Title className="mb-0">Próximas Clases</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Clase</th>
                    <th>Coach</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Duración</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.clase}</td>
                      <td>{reserva.coach}</td>
                      <td>{reserva.fecha}</td>
                      <td>{reserva.hora}</td>
                      <td>{reserva.duracion}</td>
                      <td>{getEstadoBadge(reserva.estado)}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelar(reserva.id)}
                        >
                          Cancelar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="mt-4">
            <Button variant="primary" size="lg">
              + Reservar Nueva Clase
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Reservas
