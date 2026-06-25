import { useEffect, useState } from 'react'
import { Container, Table, Button, Card, Row, Col, Badge, Modal, Form, Spinner } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import sportService from '../../services/sportService'

const Deportes = () => {
  const [deportes, setDeportes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDeporte, setEditingDeporte] = useState(null)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    objective: '',
    duration: '',
    status: true
  })

  // Cargar deportes al montar componente
  useEffect(() => {
    loadDeportes()
  }, [])

  // Cargar deportes desde API
  const loadDeportes = async () => {
    try {
      setLoading(true)
      const response = await sportService.getAll()
      const data = response.data || response
      setDeportes(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando deportes:', error)
      Swal.fire('Error', 'No se pudieron cargar los deportes', 'error')
      setDeportes([])
    } finally {
      setLoading(false)
    }
  }

  // Validar formulario
  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Nombre obligatorio'
    }
    if (!form.objective.trim()) {
      newErrors.objective = 'Objetivo obligatorio'
    }
    if (!form.duration || form.duration <= 0) {
      newErrors.duration = 'Duración obligatoria y debe ser mayor a 0'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Abrir modal para crear
  const handleNuevoDeporte = () => {
    setEditingDeporte(null)
    setForm({ name: '', objective: '', duration: '', status: true })
    setErrors({})
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEditar = (deporte) => {
    setEditingDeporte(deporte)
    setForm({
      name: deporte.name,
      objective: deporte.objective,
      duration: deporte.duration,
      status: deporte.status
    })
    setErrors({})
    setShowModal(true)
  }

  // Guardar deporte (crear o editar)
  const handleGuardar = async () => {
    if (!validateForm()) return

    try {
      if (editingDeporte) {
        // Editar
        await sportService.update(editingDeporte.id, form)
        Swal.fire('¡Éxito!', 'Deporte actualizado correctamente', 'success')
      } else {
        // Crear
        await sportService.create(form)
        Swal.fire('¡Éxito!', 'Deporte creado correctamente', 'success')
      }
      
      setShowModal(false)
      setForm({ name: '', objective: '', duration: '', status: true })
      setErrors({})
      await loadDeportes() // Recargar lista
    } catch (error) {
      console.error('Error guardando deporte:', error)
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar deporte', 'error')
    }
  }

  // Eliminar deporte
  const handleEliminar = async (deporte) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el deporte "${deporte.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await sportService.delete(deporte.id)
        Swal.fire('¡Eliminado!', 'Deporte eliminado correctamente', 'success')
        await loadDeportes() // Recargar lista
      } catch (error) {
        console.error('Error eliminando deporte:', error)
        Swal.fire('Error', error.response?.data?.message || 'Error al eliminar deporte', 'error')
      }
    }
  }

  // Cambiar estado del deporte
  const handleCambiarEstado = async (deporte) => {
    try {
      await sportService.updateStatus(deporte.id, !deporte.status)
      
      // Actualizar estado local inmediatamente
      setDeportes(deportes.map(d => 
        d.id === deporte.id ? { ...d, status: !d.status } : d
      ))
      
      const nuevoEstado = !deporte.status ? 'Activo' : 'Inactivo'
      Swal.fire('¡Éxito!', `Deporte marcado como ${nuevoEstado}`, 'success')
    } catch (error) {
      console.error('Error cambiando estado:', error)
      Swal.fire('Error', 'Error al cambiar estado del deporte', 'error')
    }
  }

  // Formatear fecha a "15 de Julio de 2026"
  const formatearFecha = (fechaStr) => {
    try {
      const fecha = new Date(fechaStr)
      const opciones = { day: 'numeric', month: 'long', year: 'numeric', locale: 'es-ES' }
      return fecha.toLocaleDateString('es-ES', opciones)
    } catch {
      return 'Fecha inválida'
    }
  }

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Gestión de Deportes</h1>
            <p className="text-muted">Administra todos los deportes ofrecidos por el club</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{deportes.length}</div>
                  <Card.Text>Deportes Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{deportes.filter(d => d.status).length}</div>
                  <Card.Text>Deportes Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{deportes.filter(d => !d.status).length}</div>
                  <Card.Text>Deportes Inactivos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  variant="primary" 
                  onClick={loadDeportes}
                  disabled={loading}
                >
                  🔄 Refrescar
                </Button>
                <Button 
                  variant="success" 
                  onClick={handleNuevoDeporte}
                  disabled={loading}
                >
                  + Crear Deporte
                </Button>
              </div>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando deportes...</p>
            </div>
          ) : deportes.length === 0 ? (
            <Card className="text-center py-5">
              <Card.Body>
                <p className="text-muted">No hay deportes registrados</p>
                <Button 
                  variant="success" 
                  onClick={handleNuevoDeporte}
                >
                  + Crear Primer Deporte
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover striped>
                    <thead style={{ backgroundColor: '#dc3545 !important', color: 'white' }}>
                      <tr>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }}>Nombre</th>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }}>Objetivo</th>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }}>Duración (min)</th>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }}>Estado</th>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }}>Fecha Creación</th>
                        <th style={{ backgroundColor: '#dc3545', color: 'white' }} className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deportes.map((deporte) => (
                        <tr key={deporte.id}>
                          <td>
                            <strong>{deporte.name}</strong>
                          </td>
                          <td>{deporte.objective}</td>
                          <td className="text-center">{deporte.duration}</td>
                          <td className="text-center">
                            <div className="form-check form-switch d-inline-block">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`switch-${deporte.id}`}
                                checked={deporte.status}
                                onChange={() => handleCambiarEstado(deporte)}
                              />
                              <label 
                                className="form-check-label"
                                htmlFor={`switch-${deporte.id}`}
                              >
                                {deporte.status ? (
                                  <Badge bg="success">Activo</Badge>
                                ) : (
                                  <Badge bg="danger">Inactivo</Badge>
                                )}
                              </label>
                            </div>
                          </td>
                          <td>{formatearFecha(deporte.created_at)}</td>
                          <td className="text-center">
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditar(deporte)}
                            >
                              ✏️ Editar
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleEliminar(deporte)}
                            >
                              🗑️ Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>

      {/* Modal para crear/editar deporte */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDeporte ? '✏️ Editar Deporte' : '➕ Crear Deporte'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: CrossFit"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errors.name}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Objetivo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe el objetivo principal del deporte"
                value={form.objective}
                onChange={(e) => setForm({ ...form, objective: e.target.value })}
                isInvalid={!!errors.objective}
              />
              {errors.objective && (
                <Form.Control.Feedback type="invalid">
                  {errors.objective}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 60"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || '' })}
                isInvalid={!!errors.duration}
                min="1"
              />
              {errors.duration && (
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Estado (Activo)"
                checked={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            {editingDeporte ? '💾 Guardar Cambios' : '✅ Crear Deporte'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Deportes
