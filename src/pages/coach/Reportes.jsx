import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'

const Reportes = () => {
  const reportes = [
    {
      id: 1,
      titulo: 'Asistencia Mes Enero',
      fecha: '2024-01-25',
      tipo: 'Asistencia',
      estado: 'Completado'
    },
    {
      id: 2,
      titulo: 'Desempeño de Alumnos',
      fecha: '2024-01-20',
      tipo: 'Desempeño',
      estado: 'Completado'
    },
    {
      id: 3,
      titulo: 'Horas de Clases Impartidas',
      fecha: '2024-01-15',
      tipo: 'Horas',
      estado: 'Completado'
    },
    {
      id: 4,
      titulo: 'Retención de Alumnos',
      fecha: '2024-01-10',
      tipo: 'General',
      estado: 'Completado'
    }
  ]

  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Reportes</h1>
            <p className="text-muted">Visualiza reportes de asistencia y desempeño de tus alumnos</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">12</div>
                  <Card.Text>Reportes Totales</Card.Text>
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
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">24</div>
                  <Card.Text>Alumnos Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white">
              <Card.Title className="mb-0">Reportes Generados</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte) => (
                    <tr key={reporte.id}>
                      <td>{reporte.titulo}</td>
                      <td>{reporte.tipo}</td>
                      <td>{reporte.fecha}</td>
                      <td>
                        <Badge bg="success">{reporte.estado}</Badge>
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

export default Reportes
