import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Comunidad = () => {
  const comunidad = [
    {
      id: 1,
      nombre: 'Carlos Martínez',
      rol: 'Coach',
      especialidad: 'CrossFit',
      seguidores: 245,
      siguiendo: false
    },
    {
      id: 2,
      nombre: 'Ana López',
      rol: 'Usuario',
      especialidad: 'Yoga',
      seguidores: 128,
      siguiendo: true
    },
    {
      id: 3,
      nombre: 'Pedro Ruiz',
      rol: 'Coach',
      especialidad: 'Pilates',
      seguidores: 189,
      siguiendo: false
    }
  ]

  const handleSeguir = (id) => {
    Swal.fire('¡Siguiendo!', 'Ahora recibirás actualizaciones', 'success')
  }

  return (
    <div className="dashboard-container user-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="usuario" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Comunidad SportClub</h1>
            <p className="text-muted">Conecta con otros usuarios y comparte experiencias</p>
          </div>

          <Row className="mt-5 mb-5">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">1,234</div>
                  <Card.Text>Miembros Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">487</div>
                  <Card.Text>Estoy Siguiendo</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">892</div>
                  <Card.Text>Mis Seguidores</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h3 className="mb-4">Miembros Recomendados</h3>
          <Row>
            {comunidad.map((miembro) => (
              <Col md={4} key={miembro.id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <div className="text-center mb-3">
                      <div style={{ fontSize: '3rem' }}>👤</div>
                      <Card.Title>{miembro.nombre}</Card.Title>
                      <small className="text-muted">{miembro.rol}</small>
                    </div>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Especialidad:</strong> {miembro.especialidad}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Seguidores:</strong> {miembro.seguidores}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button
                      variant={miembro.siguiendo ? 'secondary' : 'primary'}
                      className="w-100 mt-3"
                      onClick={() => handleSeguir(miembro.id)}
                    >
                      {miembro.siguiendo ? '✓ Siguiendo' : '+ Seguir'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-info text-white">
              <Card.Title className="mb-0">Actividad Reciente</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Carlos Martínez</strong> completó su clase de CrossFit • hace 2 horas
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Ana López</strong> alcanzó 50 clases de Yoga • hace 5 horas
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pedro Ruiz</strong> compartió un logro: "¡Nuevo récord!" • hace 1 día
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default Comunidad
