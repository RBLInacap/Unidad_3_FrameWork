import { useEffect, useState } from 'react'
import { Container, Table, Button, Card, Row, Col, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import userService from '../../services/userService'
import { useAuth } from '../../contexts/AuthContext'

const Alumnos = () => {
  const { user: authUser } = useAuth()
  const [coach, setCoach] = useState(null)
  const [students, setStudents] = useState([])
  const [assignedIds, setAssignedIds] = useState([])
  const [loading, setLoading] = useState(true)

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
        const studentIds = Array.isArray(freshCoach.metadata?.students)
          ? freshCoach.metadata.students.map((item) => (typeof item === 'object' ? item.id : item))
          : []

        setCoach(freshCoach)
        setStudents(allStudents)
        setAssignedIds(studentIds)
      } catch (error) {
        console.error('Error cargando alumnos:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [authUser])

  const saveMetadata = async (metadata) => {
    try {
      const payload = { metadata }
      const res = await userService.update(coach.id, payload)
      const updatedCoach = res.data || res
      localStorage.setItem('user', JSON.stringify(updatedCoach))
      setCoach(updatedCoach)
      return updatedCoach
    } catch (error) {
      console.error('Error guardando metadata del coach:', error)
      Swal.fire('Error', 'No se pudo guardar la información del coach', 'error')
      return null
    }
  }

  const handleToggleAsignacion = async (studentId) => {
    const newAssigned = assignedIds.includes(studentId)
      ? assignedIds.filter((id) => id !== studentId)
      : [...assignedIds, studentId]

    const metadata = {
      ...(coach.metadata || {}),
      students: newAssigned
    }

    const updatedCoach = await saveMetadata(metadata)
    if (updatedCoach) {
      setAssignedIds(newAssigned)
      Swal.fire('Éxito', `Alumno ${newAssigned.includes(studentId) ? 'asignado' : 'desasignado'} correctamente`, 'success')
    }
  }

  const assignedStudents = students.filter((student) => assignedIds.includes(student.id))
  const activeStudents = assignedStudents.length
  const totalStudents = students.length
  const attendance = totalStudents === 0 ? 0 : Math.round((activeStudents / totalStudents) * 100)

  const getEstadoBadge = (isAssigned) => {
    return isAssigned
      ? <Badge bg="success">Asignado</Badge>
      : <Badge bg="secondary">Disponible</Badge>
  }

  const handleContactar = (email) => {
    if (!email) {
      return Swal.fire('Error', 'No se encontró el email del alumno', 'error')
    }

    window.location.href = `mailto:${email}`
  }

  return (
    <div className="dashboard-container coach-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="coach" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Alumnos</h1>
            <p className="text-muted">Gestiona la lista de tus alumnos y su progreso</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalStudents}</div>
                  <Card.Text>Alumnos Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{activeStudents}</div>
                  <Card.Text>Alumnos Asignados</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{attendance}%</div>
                  <Card.Text>Participación estimada</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-success text-white">
              <Card.Title className="mb-0">Lista de Alumnos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5">Cargando alumnos...</td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="5">No hay alumnos registrados.</td>
                    </tr>
                  ) : (
                    students.map((alumno) => {
                      const isAssigned = assignedIds.includes(alumno.id)
                      return (
                        <tr key={alumno.id}>
                          <td>{alumno.full_name}</td>
                          <td>{alumno.email}</td>
                          <td>{alumno.role}</td>
                          <td>{getEstadoBadge(isAssigned)}</td>
                          <td>
                            <Button
                              variant={isAssigned ? 'outline-danger' : 'success'}
                              size="sm"
                              className="me-2"
                              onClick={() => handleToggleAsignacion(alumno.id)}
                            >
                              {isAssigned ? 'Desasignar' : 'Asignar'}
                            </Button>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleContactar(alumno.email)}
                            >
                              Contactar
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
        </Container>
      </div>
    </div>
  )
}

export default Alumnos
