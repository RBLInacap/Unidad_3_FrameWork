import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'
import userService from '../../services/userService'
import { useAuth } from '../../contexts/AuthContext'

const Reportes = () => {
  const { user: authUser } = useAuth()
  const [coach, setCoach] = useState(null)
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])

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
        console.error('Error cargando reportes:', error)
      }
    }

    load()
  }, [authUser])

  const assignedIds = Array.isArray(coach.metadata?.students)
    ? coach.metadata.students.map((item) => (typeof item === 'object' ? item.id : item))
    : []

  const assignedStudents = students.filter((student) => assignedIds.includes(student.id))
  const totalClasses = classes.length
  const totalStudents = assignedStudents.length
  const totalCapacity = classes.reduce((sum, clase) => sum + Number(clase.capacidad || 0), 0)
  const classesWithStudents = classes.filter((clase) => (Array.isArray(clase.studentIds) ? clase.studentIds.length > 0 : assignedStudents.length > 0)).length

  const today = new Date().toLocaleDateString('es-ES')

  const reportes = [
    {
      id: 1,
      titulo: 'Clases Creadas',
      fecha: today,
      tipo: 'Clases',
      valor: `${totalClasses}`,
      estado: 'Completado'
    },
    {
      id: 2,
      titulo: 'Alumnos Asignados',
      fecha: today,
      tipo: 'Alumnos',
      valor: `${totalStudents}`,
      estado: 'Completado'
    },
    {
      id: 3,
      titulo: 'Capacidad Total',
      fecha: today,
      tipo: 'Capacidad',
      valor: `${totalCapacity}`,
      estado: 'Completado'
    },
    {
      id: 4,
      titulo: 'Clases con alumnos inscritos',
      fecha: today,
      tipo: 'Inscripciones',
      valor: `${classesWithStudents}`,
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
                  <div className="stat-number">{reportes.length}</div>
                  <Card.Text>Reportes Generados</Card.Text>
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
                  <div className="stat-number">{classesWithStudents}</div>
                  <Card.Text>Clases con Asignaciones</Card.Text>
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
                    <th>Valor</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte) => (
                    <tr key={reporte.id}>
                      <td>{reporte.titulo}</td>
                      <td>{reporte.tipo}</td>
                      <td>{reporte.fecha}</td>
                      <td>{reporte.valor}</td>
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
