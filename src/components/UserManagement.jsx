import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import userService from '../services/userService'
import { validateName, validateEmail } from '../utils/validators'
import Swal from 'sweetalert2'
import './UserManagement.css'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'usuario'
  })
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getAll()
      setUsers(response.data || response)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar usuarios'
      })
    } finally {
      setLoading(false)
    }
  }

  const validateFormData = () => {
    const errors = {}

    if (!formData.firstName) {
      errors.firstName = 'El nombre es requerido'
    } else if (!validateName(formData.firstName)) {
      errors.firstName = 'Nombre inválido'
    }

    if (!formData.lastName) {
      errors.lastName = 'El apellido es requerido'
    } else if (!validateName(formData.lastName)) {
      errors.lastName = 'Apellido inválido'
    }

    if (!formData.email) {
      errors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email inválido'
    }

    return errors
  }

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      })
    } else {
      setEditingUser(null)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'usuario'
      })
    }
    setFormErrors({})
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setFormErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error al escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validateFormData()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      if (editingUser) {
        await userService.update(editingUser.id, formData)
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Usuario actualizado correctamente',
          timer: 1500,
          showConfirmButton: false
        })
      } else {
        await userService.create({
          ...formData,
          password: 'temp123456'
        })
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'Usuario creado correctamente',
          timer: 1500,
          showConfirmButton: false
        })
      }
      handleCloseModal()
      loadUsers()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al guardar usuario'
      })
    }
  }

  const handleDelete = async (userId) => {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.delete(userId)
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'Usuario eliminado correctamente',
            timer: 1500,
            showConfirmButton: false
          })
          loadUsers()
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al eliminar usuario'
          })
        }
      }
    })
  }

  if (loading) {
    return <div className="text-center"><p>Cargando usuarios...</p></div>
  }

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>Gestión de Usuarios</h2>
        <Button
          variant="danger"
          onClick={() => handleOpenModal()}
        >
          + Crear Usuario
        </Button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-5">
          <p>No hay usuarios registrados</p>
        </div>
      ) : (
        <Table striped bordered hover className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge badge-role role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? 'Editar Usuario' : 'Crear Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!formErrors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!formErrors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="usuario">Usuario</option>
                <option value="coach">Coach</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100">
              {editingUser ? 'Actualizar' : 'Crear'} Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserManagement
