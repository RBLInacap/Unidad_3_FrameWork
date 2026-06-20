import { Container, Table, Button, Card, Row, Col, Badge, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Clases = () => {
  const [showModal, setShowModal] = useState(false)

  const clases = [
    {
      id: 1,
      nombre: 'CrossFit Intenso',
      dia: 'Lunes',
      hora: '07:00',
      duracion: '60 min',
      alumnos: 15,
      capacidad: 20,
      estado: 'activa'
    },
    {
      id: 2,
      nombre: 'CrossFit Matinal',
      dia: 'Miércoles',
      hora: '06:00',
      duracion: '60 min',
      alumnos: 18,
      capacidad: 20,
      estado: 'activa'
    },
    {
      id: 3,
      nombre: 'CrossFit Nocturno',
      dia: 'Viernes',
      hora: '19:00',
      duracion: '60 min',
      alumnos: 12,
      capacidad: 20,
      estado: 'activa'
    }
  ]

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Eliminar clase?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminada', 'Clase eliminada correctamente', 'success')
      }
    })
  }

  const getEstadoBadge = (estado) => {
    return estado === 'activa'
      ? <Badge bg="success">Activa</Badge>
      : <Badge bg="secondary">Inactiva</Badge>
  }

  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Clases</h1>
            <p className="text-muted">Organiza y programa tus clases</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">3</div>
                  <Card.Text>Clases Activas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">45</div>
                  <Card.Text>Alumnos Total</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">180</div>
                  <Card.Text>Horas Impartidas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Mis Clases</Card.Title>
              <Button
                variant="light"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                + Nueva Clase
              </Button>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Día</th>
                    <th>Hora</th>
                    <th>Duración</th>
                    <th>Alumnos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clases.map((clase) => (
                    <tr key={clase.id}>
                      <td>{clase.nombre}</td>
                      <td>{clase.dia}</td>
                      <td>{clase.hora}</td>
                      <td>{clase.duracion}</td>
                      <td>{clase.alumnos}/{clase.capacidad}</td>
                      <td>{getEstadoBadge(clase.estado)}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleEliminar(clase.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Nueva Clase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Clase</Form.Label>
                  <Form.Control placeholder="Ej: CrossFit Intenso" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Día</Form.Label>
                  <Form.Select>
                    <option>Selecciona un día</option>
                    <option>Lunes</option>
                    <option>Martes</option>
                    <option>Miércoles</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary">
                Crear Clase
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  )
}

export default Clases
