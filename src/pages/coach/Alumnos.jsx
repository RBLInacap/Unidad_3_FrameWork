import { Container, Table, Button, Card, Row, Col, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Alumnos = () => {
  const alumnos = [
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan@example.com',
      clases: 12,
      asistencia: '92%',
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'María López',
      email: 'maria@example.com',
      clases: 8,
      asistencia: '75%',
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      clases: 5,
      asistencia: '60%',
      estado: 'inactivo'
    }
  ]

  const handleContactar = (nombre) => {
    Swal.fire({
      title: `Contactar a ${nombre}`,
      input: 'textarea',
      inputLabel: 'Mensaje',
      inputPlaceholder: 'Escribe tu mensaje...',
      showCancelButton: true,
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Enviado', 'Mensaje enviado correctamente', 'success')
      }
    })
  }

  const getEstadoBadge = (estado) => {
    return estado === 'activo' 
      ? <Badge bg="success">Activo</Badge>
      : <Badge bg="secondary">Inactivo</Badge>
  }

  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Alumnos</h1>
            <p className="text-muted">Gestiona la lista de tus alumnos y su progreso</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">24</div>
                  <Card.Text>Alumnos Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">19</div>
                  <Card.Text>Alumnos Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">87%</div>
                  <Card.Text>Asistencia Promedio</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white">
              <Card.Title className="mb-0">Lista de Alumnos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Clases</th>
                    <th>Asistencia</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id}>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.email}</td>
                      <td>{alumno.clases}</td>
                      <td>{alumno.asistencia}</td>
                      <td>{getEstadoBadge(alumno.estado)}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleContactar(alumno.nombre)}
                        >
                          Contactar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="mt-4">
            <Button variant="success" size="lg">
              + Agregar Nuevo Alumno
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Alumnos
