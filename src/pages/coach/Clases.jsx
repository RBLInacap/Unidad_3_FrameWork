import { useEffect, useState } from 'react'
import { Container, Table, Button, Card, Row, Col, Badge, Modal, Form } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import userService from '../../services/userService'
import { useAuth } from '../../contexts/AuthContext'

const Clases = () => {
  const { user: authUser } = useAuth()
  const [coach, setCoach] = useState(null)
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingClass, setEditingClass] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    dia: '',
    hora: '',
    duracion: '',
    capacidad: '20',
    studentIds: []
  })

  useEffect(() => {
    const load = async () => {
      try {
        if (!authUser?.id) return

        const [coachRes, studentsRes] = await Promise.all([
          userService.getById(authUser.id),
          userService.getAll({ role: 'user' })
        ])

        const freshCoach = coachRes.data || coachRes
        const allStudents = (studentsRes.data || studentsRes) || []
        const savedClasses = Array.isArray(freshCoach.metadata?.clases) ? freshCoach.metadata.clases : []

        setCoach(freshCoach)
        setStudents(allStudents)
        setClasses(savedClasses)
      } catch (error) {
        console.error('Error cargando clases:', error)
      }
    }

    load()
  }, [authUser])

  const saveClasses = async (newClasses) => {
    try {
      const metadata = {
        ...(coach.metadata || {}),
        clases: newClasses
      }
      const res = await userService.update(coach.id, { metadata })
      const updatedCoach = res.data || res
      localStorage.setItem('user', JSON.stringify(updatedCoach))
      setCoach(updatedCoach)
      setClasses(newClasses)
      return updatedCoach
    } catch (error) {
      console.error('Error guardando clases:', error)
      Swal.fire('Error', 'No se pudo guardar la clase', 'error')
      return null
    }
  }

  const assignedIds = Array.isArray(coach.metadata?.students)
    ? coach.metadata.students.map((item) => (typeof item === 'object' ? item.id : item))
    : []
  const assignedStudents = students.filter((student) => assignedIds.includes(student.id))

  const getEstadoBadge = (estado) => {
    return estado === 'activa'
      ? <Badge bg="success">Activa</Badge>
      : <Badge bg="secondary">Inactiva</Badge>
  }

  const openNewModal = () => {
    setEditingClass(null)
    setForm({ nombre: '', dia: '', hora: '', duracion: '', capacidad: '20', studentIds: assignedIds })
    setShowModal(true)
  }

  const openEditModal = (clase) => {
    setEditingClass(clase)
    setForm({
      nombre: clase.nombre,
      dia: clase.dia,
      hora: clase.hora,
      duracion: clase.duracion,
      capacidad: String(clase.capacidad || 20),
      studentIds: clase.studentIds || assignedIds
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingClass(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleStudentToggle = (studentId) => {
    setForm((prev) => {
      const studentIds = prev.studentIds.includes(studentId)
        ? prev.studentIds.filter((id) => id !== studentId)
        : [...prev.studentIds, studentId]
      return { ...prev, studentIds }
    })
  }

  const handleSaveClass = async () => {
    if (!form.nombre || !form.dia || !form.hora || !form.duracion || !form.capacidad) {
      return Swal.fire('Error', 'Completa todos los campos de la clase', 'warning')
    }

    const newClass = {
      id: editingClass ? editingClass.id : Date.now(),
      nombre: form.nombre,
      dia: form.dia,
      hora: form.hora,
      duracion: form.duracion,
      capacidad: Number(form.capacidad),
      estado: 'activa',
      studentIds: form.studentIds
    }

    const updatedClasses = editingClass
      ? classes.map((clase) => (clase.id === editingClass.id ? newClass : clase))
      : [...classes, newClass]

    const updatedCoach = await saveClasses(updatedClasses)
    if (updatedCoach) {
      Swal.fire('Éxito', `Clase ${editingClass ? 'actualizada' : 'creada'} correctamente`, 'success')
      closeModal()
    }
  }

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar clase?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      const newClasses = classes.filter((clase) => clase.id !== id)
      await saveClasses(newClasses)
      Swal.fire('Eliminada', 'Clase eliminada correctamente', 'success')
    }
  }

  const totalClasses = classes.length
  const totalStudents = assignedStudents.length
  const totalCapacity = classes.reduce((sum, clase) => sum + Number(clase.capacidad || 0), 0)

  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Clases</h1>
            <p className="text-muted">Organiza y programa tus clases</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalClasses}</div>
                  <Card.Text>Clases Creadas</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalStudents}</div>
                  <Card.Text>Alumnos Asignados</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalCapacity}</div>
                  <Card.Text>Capacidad Total</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Mis Clases</Card.Title>
              <Button variant="light" size="sm" onClick={openNewModal}>
                + Nueva Clase
              </Button>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Día</th>
                    <th>Hora</th>
                    <th>Duración</th>
                    <th>Alumnos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length === 0 ? (
                    <tr>
                      <td colSpan="7">Aún no tienes clases creadas. Agrega una clase para comenzar.</td>
                    </tr>
                  ) : (
                    classes.map((clase) => {
                      const enrolled = Array.isArray(clase.studentIds) ? clase.studentIds.length : assignedStudents.length
                      return (
                        <tr key={clase.id}>
                          <td>{clase.nombre}</td>
                          <td>{clase.dia}</td>
                          <td>{clase.hora}</td>
                          <td>{clase.duracion}</td>
                          <td>{enrolled}/{clase.capacidad}</td>
                          <td>{getEstadoBadge(clase.estado)}</td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(clase)}>
                              Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleEliminar(clase.id)}>
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editingClass ? 'Editar Clase' : 'Nueva Clase'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Clase</Form.Label>
                  <Form.Control name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: CrossFit Intenso" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Día</Form.Label>
                  <Form.Select name="dia" value={form.dia} onChange={handleChange}>
                    <option value="">Selecciona un día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time" name="hora" value={form.hora} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duración</Form.Label>
                  <Form.Control name="duracion" value={form.duracion} onChange={handleChange} placeholder="Ej: 60 min" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Capacidad</Form.Label>
                  <Form.Control type="number" name="capacidad" value={form.capacidad} onChange={handleChange} min="1" />
                </Form.Group>
                {assignedStudents.length > 0 && (
                  <div className="mb-3">
                    <Form.Label>Asignar alumnos</Form.Label>
                    {assignedStudents.map((student) => (
                      <Form.Check
                        key={student.id}
                        type="checkbox"
                        label={student.full_name}
                        checked={form.studentIds.includes(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                      />
                    ))}
                  </div>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveClass}>
                {editingClass ? 'Guardar cambios' : 'Crear Clase'}
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  )
}

export default Clases
