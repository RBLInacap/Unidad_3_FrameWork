import { Container, Table, Button, Card, Row, Col, Badge, Form } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Usuarios = () => {
  const usuarios = [
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan@example.com',
      rol: 'usuario',
      estado: 'activo',
      fecha: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'María López',
      email: 'maria@example.com',
      rol: 'coach',
      estado: 'activo',
      fecha: '2024-01-20'
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      email: 'carlos@example.com',
      rol: 'usuario',
      estado: 'inactivo',
      fecha: '2023-12-10'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana@example.com',
      rol: 'usuario',
      estado: 'activo',
      fecha: '2024-01-25'
    }
  ]

  const handleEstado = (id, estado) => {
    const nuevoEstado = estado === 'activo' ? 'inactivo' : 'activo'
    Swal.fire({
      title: `¿${nuevoEstado === 'activo' ? 'Activar' : 'Desactivar'} usuario?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success')
      }
    })
  }

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success')
      }
    })
  }

  const getRolBadge = (rol) => {
    if (rol === 'admin') return <Badge bg="danger">Admin</Badge>
    if (rol === 'coach') return <Badge bg="success">Coach</Badge>
    return <Badge bg="info">Usuario</Badge>
  }

  const getEstadoBadge = (estado) => {
    return estado === 'activo'
      ? <Badge bg="success">Activo</Badge>
      : <Badge bg="secondary">Inactivo</Badge>
  }

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Gestión de Usuarios</h1>
            <p className="text-muted">Administra todos los usuarios del sistema</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">128</div>
                  <Card.Text>Usuarios Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">105</div>
                  <Card.Text>Usuarios Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">45</div>
                  <Card.Text>Coaches</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">23</div>
                  <Card.Text>Inactivos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-danger text-white">
              <Card.Title className="mb-0">Lista de Usuarios</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="mb-3">
                <Form.Control placeholder="Buscar usuario..." />
              </Form>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{getRolBadge(usuario.rol)}</td>
                      <td>{getEstadoBadge(usuario.estado)}</td>
                      <td>{usuario.fecha}</td>
                      <td>
                        <Button
                          variant={usuario.estado === 'activo' ? 'warning' : 'success'}
                          size="sm"
                          className="me-2"
                          onClick={() => handleEstado(usuario.id, usuario.estado)}
                        >
                          {usuario.estado === 'activo' ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleEliminar(usuario.id)}
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
        </Container>
      </div>
    </div>
  )
}

export default Usuarios
