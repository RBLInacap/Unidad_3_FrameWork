import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const Configuracion = () => {
  const handleGuardar = () => {
    Swal.fire('Guardado', 'Configuración actualizada correctamente', 'success')
  }

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Configuración del Sistema</h1>
            <p className="text-muted">Ajusta los parámetros de la plataforma</p>
          </div>

          <Row className="mt-5">
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header className="bg-danger text-white">
                  <Card.Title className="mb-0">Configuración General</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre de la Plataforma</Form.Label>
                      <Form.Control defaultValue="SportClub" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email de Contacto</Form.Label>
                      <Form.Control defaultValue="contacto@sportclub.com" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control defaultValue="+34 XXX XXX XXX" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3}
                        defaultValue="La plataforma completa para gestionar tu comunidad deportiva"
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header className="bg-danger text-white">
                  <Card.Title className="mb-0">Configuración de Clases</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Capacidad Máxima por Clase</Form.Label>
                      <Form.Control type="number" defaultValue="20" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Duración Estándar (minutos)</Form.Label>
                      <Form.Control type="number" defaultValue="60" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check type="checkbox" label="Permitir Cancelaciones" defaultChecked />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="bg-danger text-white">
                  <Card.Title className="mb-0">Configuración de Seguridad</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="checkbox" 
                        label="Requerir Verificación de Email" 
                        defaultChecked 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="checkbox" 
                        label="Autenticación de Dos Factores" 
                        defaultChecked 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Sesión Expira Después de (horas)</Form.Label>
                      <Form.Control type="number" defaultValue="24" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              <div className="mt-4 mb-4">
                <Button 
                  variant="success" 
                  size="lg" 
                  className="me-2"
                  onClick={handleGuardar}
                >
                  💾 Guardar Cambios
                </Button>
                <Button variant="secondary" size="lg">
                  ↩️ Descartar
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Configuracion
