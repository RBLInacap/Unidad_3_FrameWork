import { Container, Row, Col, Card, Table } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'

const Reportes = () => {
  const reportes = [
    {
      id: 1,
      titulo: 'Actividad de Usuarios',
      fecha: '2024-01-25',
      tipo: 'General',
      estado: 'Completado'
    },
    {
      id: 2,
      titulo: 'Asistencia a Clases',
      fecha: '2024-01-24',
      tipo: 'Asistencia',
      estado: 'Completado'
    },
    {
      id: 3,
      titulo: 'Ingresos por Suscripciones',
      fecha: '2024-01-20',
      tipo: 'Financiero',
      estado: 'Completado'
    }
  ]

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Reportes del Sistema</h1>
            <p className="text-muted">Visualiza los reportes generados</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">24</div>
                  <Card.Text>Reportes Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">18</div>
                  <Card.Text>Este Mes</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">✓</div>
                  <Card.Text>Todos Completados</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-danger text-white">
              <Card.Title className="mb-0">Últimos Reportes</Card.Title>
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
                      <td>{reporte.estado}</td>
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
