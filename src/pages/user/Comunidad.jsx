import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import userService from '../../services/userService'

const Comunidad = () => {
  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    async function loadCoaches() {
      try {
        const res = await userService.getAll({ role: 'coach' })
        const list = (res.data && res.data) || res
        setCoaches(list)
      } catch (error) {
        console.error('Error cargando coaches:', error)
      }
    }

    loadCoaches()
  }, [])

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
            <p className="text-muted">Conecta con los coaches disponibles y conoce su especialidad</p>
          </div>
 
          <Row className="mt-4 mb-4">
            {coaches.map((coach) => {
              const sportName = coach.metadata?.sports?.[0]?.name || 'No especificado'
              const specialty = coach.metadata?.specialty || 'General'
              return (
                <Col md={4} key={coach.id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <div className="text-center mb-3">
                        <div style={{ fontSize: '3rem' }}>👤</div>
                        <Card.Title>{coach.full_name}</Card.Title>
                        <small className="text-muted">Coach</small>
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Email:</strong> {coach.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Deporte:</strong> {sportName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Especialidad:</strong> {specialty}
                        </ListGroup.Item>
                      </ListGroup>
                      <Button
                        variant="outline-primary"
                        className="w-100 mt-3"
                        href={`mailto:${coach.email}`}
                      >
                        Contactar coach
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
 
          <hr className="my-5" />
 
          <Card>
            <Card.Header className="bg-info text-white">
              <Card.Title className="mb-0">Actividad Reciente</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Actividad</strong> de los coaches se muestra aquí
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
