import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'
import { useAuth } from '../../contexts/AuthContext'
import userService from '../../services/userService'

const Progreso = () => {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState(null)
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    async function load() {
      try {
        if (!authUser?.id) return
        const res = await userService.getById(authUser.id)
        const freshUser = res.data || res
        setUser(freshUser)
        const reservasMeta = (freshUser.metadata && freshUser.metadata.reservas) || []
        setReservas(reservasMeta)
      } catch (error) {
        console.error('Error cargando progreso:', error)
      }
    }

    load()
  }, [authUser])

  // calcular métricas a partir de reservas activas (no canceladas)
  const reservasActivas = reservas.filter((r) => r.estado !== 'cancelada')
  const totalClases = reservasActivas.length
  const completadas = reservasActivas.filter((r) => r.estado === 'confirmada').length
  const cumplimiento = totalClases === 0 ? 0 : Math.round((completadas / totalClases) * 100)
  const horas = reservasActivas
    .filter((r) => r.estado === 'confirmada')
    .reduce((acc, r) => {
      const num = Number(String(r.duracion).replace(/[^0-9]/g, '')) || 0
      return acc + num / 60
    }, 0)

  // agrupar por actividad para vista detallada
  const agrupado = reservasActivas.reduce((acc, r) => {
    const key = r.clase || 'Otras'
    if (!acc[key]) acc[key] = { actividad: key, clases: 0, completadas: 0 }
    acc[key].clases += 1
    if (r.estado === 'confirmada') acc[key].completadas += 1
    return acc
  }, {})

  const progreso = Object.values(agrupado).map((g) => ({
    actividad: g.actividad,
    clases: g.clases,
    objetivo: Math.max(10, g.clases),
    porcentaje: Math.round((g.completadas / g.clases) * 100) || 0,
    color: 'success'
  }))

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
                  <div className="stat-number">{totalClases}</div>
                  <Card.Text>Clases Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{completadas}</div>
                  <Card.Text>Completadas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{cumplimiento}%</div>
                  <Card.Text>Cumplimiento</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{Math.round(horas)}</div>
                  <Card.Text>Horas de Entrenamiento</Card.Text>
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
                    <ProgressBar now={item.porcentaje} variant={item.color} label={`${item.clases}/${item.objetivo} clases`} />
                    <small className="text-muted mt-2">
                      {item.clases} de {item.objetivo} clases registradas
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
