import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import '../Dashboard.css'
import userService from '../../services/userService'

const Reportes = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await userService.getAll()
        const allUsers = (res.data || res) || []
        setUsers(allUsers)
      } catch (error) {
        console.error('Error cargando reportes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const userSchedules = users.flatMap((user) => {
    const reservas = Array.isArray(user.metadata?.reservas) ? user.metadata.reservas : []
    return reservas.map((reserva) => ({
      id: `${user.id}-${reserva.id}`,
      nombre: user.full_name || user.nombre || 'Sin nombre',
      email: user.email,
      clase: reserva.clase,
      coach: reserva.coach,
      fecha: reserva.fecha,
      hora: reserva.hora,
      duracion: reserva.duracion,
      estado: reserva.estado || 'pendiente'
    }))
  })

  const coachTeams = users
    .filter((user) => user.role === 'coach')
    .map((coach) => {
      const studentIds = Array.isArray(coach.metadata?.students)
        ? coach.metadata.students.map((item) => (typeof item === 'object' ? item.id : item))
        : []
      const teamMembers = users.filter((user) => studentIds.includes(user.id))
      return {
        id: coach.id,
        nombre: coach.full_name || coach.nombre || 'Sin nombre',
        email: coach.email,
        teamSize: teamMembers.length,
        members: teamMembers
      }
    })

  const totalSchedules = userSchedules.length
  const totalTeams = coachTeams.length
  const totalTeamMembers = coachTeams.reduce((sum, team) => sum + team.teamSize, 0)

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Reportes del Sistema</h1>
            <p className="text-muted">Visualiza horarios de usuarios y equipos de coaches</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalSchedules}</div>
                  <Card.Text>Horarios registrados</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalTeams}</div>
                  <Card.Text>Coaches con equipos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalTeamMembers}</div>
                  <Card.Text>Integrantes en equipos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /></div>
          ) : (
            <>
              <Card className="mb-5">
                <Card.Header className="bg-danger text-white">
                  <Card.Title className="mb-0">Horarios de Usuarios</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Clase</th>
                        <th>Coach</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Duración</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSchedules.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">No hay horarios registrados para los usuarios.</td>
                        </tr>
                      ) : (
                        userSchedules.map((item) => (
                          <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.email}</td>
                            <td>{item.clase}</td>
                            <td>{item.coach}</td>
                            <td>{item.fecha}</td>
                            <td>{item.hora}</td>
                            <td>{item.duracion}</td>
                            <td>{item.estado}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="bg-danger text-white">
                  <Card.Title className="mb-0">Equipos de Coaches</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Coach</th>
                        <th>Email</th>
                        <th>Integrantes</th>
                        <th>Miembros</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coachTeams.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">No hay equipos de coaches registrados.</td>
                        </tr>
                      ) : (
                        coachTeams.map((team) => (
                          <tr key={team.id}>
                            <td>{team.nombre}</td>
                            <td>{team.email}</td>
                            <td>{team.teamSize}</td>
                            <td>{team.members.map((member) => member.full_name || member.nombre).join(', ') || '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          )}
        </Container>
      </div>
    </div>
  )
}

export default Reportes
