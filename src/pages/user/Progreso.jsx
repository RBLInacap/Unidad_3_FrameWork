import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'

const Progreso = () => {
  const progreso = [
    {
      actividad: 'Yoga',
      clases: 12,
      objetivo: 20,
      porcentaje: 60,
      color: 'success'
    },
    {
      actividad: 'CrossFit',
      clases: 8,
      objetivo: 15,
      porcentaje: 53,
      color: 'warning'
    },
    {
      actividad: 'Pilates',
      clases: 5,
      objetivo: 10,
      porcentaje: 50,
      color: 'info'
    },
    {
      actividad: 'Cardio',
      clases: 18,
      objetivo: 20,
      porcentaje: 90,
      color: 'danger'
    }
  ]

  return (
    <div className="dashboard-container user-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="usuario" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mi Progreso</h1>
            <p className="text-muted">Sigue tu avance en las actividades deportivas</p>
          </div>

          <Row className="mt-5 mb-5">
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">45</div>
                  <Card.Text>Clases Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">38</div>
                  <Card.Text>Completadas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">84%</div>
                  <Card.Text>Cumplimiento</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">🏆</div>
                  <Card.Text>Nivel: Oro</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h3 className="mb-4">Progreso por Actividad</h3>
          <Row>
            {progreso.map((item, idx) => (
              <Col md={6} key={idx} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title className="mb-0">{item.actividad}</Card.Title>
                      <Badge bg={item.color}>{item.porcentaje}%</Badge>
                    </div>
                    <ProgressBar 
                      now={item.porcentaje} 
                      variant={item.color}
                      label={`${item.clases}/${item.objetivo} clases`}
                    />
                    <small className="text-muted mt-2">
                      {item.clases} de {item.objetivo} clases completadas
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white">
              <Card.Title className="mb-0">Logros Desbloqueados</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center mb-3">
                  <div style={{ fontSize: '3rem' }}>🥇</div>
                  <p>Primer Paso</p>
                  <small className="text-muted">Completa tu primera clase</small>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div style={{ fontSize: '3rem' }}>⭐</div>
                  <p>Gran Comenzar</p>
                  <small className="text-muted">10 clases completadas</small>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div style={{ fontSize: '3rem' }}>🔥</div>
                  <p>En Racha</p>
                  <small className="text-muted">7 días consecutivos</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default Progreso
