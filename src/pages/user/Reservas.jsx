import { useEffect, useState } from 'react'
import {
  Container,
  Table,
  Button,
  Card,
  Row,
  Col,
  Badge,
  Modal,
  Form
} from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import userService from '../../services/userService'
import { useAuth } from '../../contexts/AuthContext'

const Reservas = () => {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState(null)
  const [reservas, setReservas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [coaches, setCoaches] = useState([])
  const [form, setForm] = useState({ clase: '', coach: '', fecha: '', hora: '', duracion: '' })

  useEffect(() => {
    async function load() {
      try {
        if (!authUser?.id) return
        const res = await userService.getById(authUser.id)
        const freshUser = res.data || res
        setUser(freshUser)
        const reservasMeta = (freshUser.metadata && freshUser.metadata.reservas) || []
        setReservas(reservasMeta)

        // obtener coaches disponibles para seleccionar al reservar
        const coachesRes = await userService.getAll({ role: 'coach' })
        const coachList = (coachesRes.data && coachesRes.data.map((c) => ({ id: c.id, name: c.full_name }))) || []
        setCoaches(coachList)
      } catch (error) {
        console.error('Error cargando reservas:', error)
      }
    }

    load()
  }, [authUser])

  const persistReservas = async (newReservas) => {
    try {
      const updatedMetadata = { ...(user.metadata || {}), reservas: newReservas }
      const res = await userService.update(user.id, { metadata: updatedMetadata })
      const updatedUser = res.data || res
      // actualizar localStorage y estado
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setReservas(newReservas)
    } catch (error) {
      console.error('Error guardando reservas:', error)
      Swal.fire('Error', 'No se pudo guardar la reserva en el servidor', 'error')
    }
  }

  const handleCancelar = (id) => {
    Swal.fire({
      title: '¿Cancelar reserva?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const newList = reservas.map((r) => (r.id === id ? { ...r, estado: 'cancelada' } : r))
        persistReservas(newList)
        Swal.fire('Cancelada', 'Reserva cancelada correctamente', 'success')
      }
    })
  }

  const getEstadoBadge = (estado) => {
    if (estado === 'confirmada') return <Badge bg="success">Confirmada</Badge>
    if (estado === 'pendiente') return <Badge bg="warning">Pendiente</Badge>
    return <Badge bg="danger">Cancelada</Badge>
  }

  const openNew = () => setShowModal(true)
  const closeNew = () => setShowModal(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreate = async () => {
    if (!form.clase || !form.coach || !form.fecha || !form.hora || !form.duracion) {
      return Swal.fire('Error', 'Completa todos los campos', 'warning')
    }

    // validar que la fecha y hora no estén en el pasado
    const selected = new Date(`${form.fecha}T${form.hora}:00`)
    const now = new Date()
    if (isNaN(selected.getTime()) || selected.getTime() <= now.getTime()) {
      return Swal.fire('Error', 'La fecha y hora seleccionadas deben ser futuras', 'warning')
    }

    const newReserva = {
      id: Date.now(),
      clase: form.clase,
      coach: form.coach,
      fecha: form.fecha,
      hora: form.hora,
      duracion: form.duracion,
      estado: 'pendiente'
    }

    const newList = [...reservas, newReserva]
    await persistReservas(newList)
    setForm({ clase: '', coach: '', fecha: '', hora: '', duracion: '' })
    closeNew()
    Swal.fire('Hecho', 'Reserva creada correctamente', 'success')
  }

  return (
    <div className="dashboard-container user-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="usuario" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Mis Reservas</h1>
            <p className="text-muted">Gestiona tus reservas de clases</p>
          </div>

          <hr className="my-4" />

          <Card>
            <Card.Header className="bg-primary text-white">
              <Card.Title className="mb-0">Próximas Clases</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Clase</th>
                    <th>Coach</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Duración</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.clase}</td>
                      <td>{reserva.coach}</td>
                      <td>{reserva.fecha}</td>
                      <td>{reserva.hora}</td>
                      <td>{reserva.duracion}</td>
                      <td>{getEstadoBadge(reserva.estado)}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelar(reserva.id)}
                          disabled={reserva.estado === 'cancelada'}
                        >
                          Cancelar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="mt-4">
            <Button variant="primary" size="lg" onClick={openNew}>
              + Reservar Nueva Clase
            </Button>
          </div>

          <Modal show={showModal} onHide={closeNew}>
            <Modal.Header closeButton>
              <Modal.Title>Nueva Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Clase</Form.Label>
                  <Form.Control name="clase" value={form.clase} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Coach</Form.Label>
                  <Form.Select name="coach" value={form.coach} onChange={handleChange}>
                    <option value="">Selecciona un coach</option>
                    {coaches.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time" name="hora" value={form.hora} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Duración (min)</Form.Label>
                  <Form.Control name="duracion" value={form.duracion} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeNew}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Reservar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  )
}

export default Reservas
