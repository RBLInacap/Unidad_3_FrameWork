import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'

const STORAGE_KEY = 'sportclub_admin_config'

const defaultConfig = {
  platformName: 'SportClub',
  contactEmail: 'contacto@sportclub.com',
  contactPhone: '+34 XXX XXX XXX',
  description: 'La plataforma completa para gestionar tu comunidad deportiva',
  classCapacity: 20,
  classDuration: 60,
  allowCancellations: true,
  requireEmailVerification: true,
  twoFactorAuth: true,
  sessionExpirationHours: 24
}

const Configuracion = () => {
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    const storedConfig = localStorage.getItem(STORAGE_KEY)
    if (storedConfig) {
      try {
        setConfig(JSON.parse(storedConfig))
      } catch (error) {
        console.error('Error parseando configuración almacenada:', error)
        setConfig(defaultConfig)
      }
    }
  }, [])

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleGuardar = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    Swal.fire('Guardado', 'Configuración actualizada correctamente', 'success')
  }

  const handleDescartar = () => {
    const storedConfig = localStorage.getItem(STORAGE_KEY)
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig))
    } else {
      setConfig(defaultConfig)
    }
    Swal.fire('Descartado', 'Los cambios fueron descartados', 'info')
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
                      <Form.Control
                        value={config.platformName}
                        onChange={(e) => handleChange('platformName', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email de Contacto</Form.Label>
                      <Form.Control
                        type="email"
                        value={config.contactEmail}
                        onChange={(e) => handleChange('contactEmail', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        value={config.contactPhone}
                        onChange={(e) => handleChange('contactPhone', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={config.description}
                        onChange={(e) => handleChange('description', e.target.value)}
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
                      <Form.Control
                        type="number"
                        value={config.classCapacity}
                        onChange={(e) => handleChange('classCapacity', Number(e.target.value))}
                        min={1}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Duración Estándar (minutos)</Form.Label>
                      <Form.Control
                        type="number"
                        value={config.classDuration}
                        onChange={(e) => handleChange('classDuration', Number(e.target.value))}
                        min={1}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Permitir Cancelaciones"
                        checked={config.allowCancellations}
                        onChange={(e) => handleChange('allowCancellations', e.target.checked)}
                      />
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
                        checked={config.requireEmailVerification}
                        onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Autenticación de Dos Factores"
                        checked={config.twoFactorAuth}
                        onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Sesión Expira Después de (horas)</Form.Label>
                      <Form.Control
                        type="number"
                        value={config.sessionExpirationHours}
                        onChange={(e) => handleChange('sessionExpirationHours', Number(e.target.value))}
                        min={1}
                      />
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
                <Button variant="secondary" size="lg" onClick={handleDescartar}>
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
