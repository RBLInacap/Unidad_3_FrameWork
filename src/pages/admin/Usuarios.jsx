import { useEffect, useState } from 'react'
import { Container, Table, Button, Card, Row, Col, Badge, Form, Spinner } from 'react-bootstrap'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Swal from 'sweetalert2'
import '../Dashboard.css'
import userService from '../../services/userService'

const roleOptions = [
  { value: 'user', label: 'Usuario' },
  { value: 'coach', label: 'Coach' },
  { value: 'admin', label: 'Admin' }
]

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await userService.getAll()
        const users = (res.data || res) || []
        setUsuarios(users)
      } catch (error) {
        console.error('Error cargando usuarios:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const refreshUsers = async () => {
    setLoading(true)
    try {
      const res = await userService.getAll()
      const users = (res.data || res) || []
      setUsuarios(users)
    } catch (error) {
      console.error('Error recargando usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userToUpdate = usuarios.find((u) => u.id === userId)
      if (!userToUpdate) return

      const updatedPayload = { role: newRole }
      await userService.update(userId, updatedPayload)
      Swal.fire('Éxito', `Rol cambiado a ${newRole}`, 'success')
      refreshUsers()
    } catch (error) {
      console.error('Error cambiando rol:', error)
      Swal.fire('Error', 'No se pudo cambiar el rol del usuario', 'error')
    }
  }

  const handleEliminar = async (userId) => {
    const result = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await userService.delete(userId)
        Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success')
        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== userId))
      } catch (error) {
        console.error('Error eliminando usuario:', error)
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
      }
    }
  }

  const getRolBadge = (rol) => {
    if (rol === 'admin') return <Badge bg="danger">Admin</Badge>
    if (rol === 'coach') return <Badge bg="success">Coach</Badge>
    return <Badge bg="info">Usuario</Badge>
  }

  const getEstadoBadge = (estado) => {
    return estado === 'activo'
      ? <Badge bg="success">Activo</Badge>
      : <Badge bg="secondary">Inactivo</Badge>
  }

  const filteredUsuarios = usuarios.filter((usuario) => {
    const term = search.trim().toLowerCase()
    if (!term) return true
    return (
      usuario.full_name?.toLowerCase().includes(term) ||
      usuario.email?.toLowerCase().includes(term) ||
      usuario.role?.toLowerCase().includes(term)
    )
  })

  const totalUsers = usuarios.length
  const activeCount = usuarios.filter((usuario) => usuario.status !== 'inactive' && usuario.status !== 'inactivo').length
  const coachCount = usuarios.filter((usuario) => usuario.role === 'coach').length
  const inactiveCount = usuarios.filter((usuario) => usuario.status === 'inactive' || usuario.status === 'inactivo').length

  return (
    <div className="dashboard-container admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Navbar role="admin" />
        <Container className="main-content">
          <div className="dashboard-header-content">
            <h1>Gestión de Usuarios</h1>
            <p className="text-muted">Administra todos los usuarios del sistema</p>
          </div>

          <Row className="mt-5 mb-4">
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{totalUsers}</div>
                  <Card.Text>Usuarios Totales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{activeCount}</div>
                  <Card.Text>Usuarios Activos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{coachCount}</div>
                  <Card.Text>Coaches</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="stat-card">
                <Card.Body className="text-center">
                  <div className="stat-number">{inactiveCount}</div>
                  <Card.Text>Inactivos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-5" />

          <Card>
            <Card.Header className="bg-danger text-white">
              <Card.Title className="mb-0">Lista de Usuarios</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="mb-3">
                <Form.Control
                  placeholder="Buscar usuario por nombre, email o rol..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>

              {loading ? (
                <div className="text-center py-5"><Spinner animation="border" /></div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Fecha Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsuarios.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">No se encontraron usuarios.</td>
                      </tr>
                    ) : (
                      filteredUsuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td>{usuario.full_name || usuario.nombre || 'Sin nombre'}</td>
                          <td>{usuario.email}</td>
                          <td>
                            <Form.Select
                              value={usuario.role}
                              onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                              size="sm"
                            >
                              {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                          <td>{getEstadoBadge(usuario.status || usuario.estado || 'activo')}</td>
                          <td>{usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString('es-ES') : usuario.fecha || '-'}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleEliminar(usuario.id)}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default Usuarios
