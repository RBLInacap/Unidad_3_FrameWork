import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { validateChangePasswordForm } from '../utils/validators'
import authService from '../services/authService'
import Swal from 'sweetalert2'
import '../pages/Dashboard.css'
import './Profile.css'

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Estado para edición de perfil
  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.first_name || '',
    lastName: user?.lastName || user?.last_name || '',
    email: user?.email || ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editErrors, setEditErrors] = useState({})

  // Estado para cambio de contraseña
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Manejadores para edición de perfil
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo
    if (editErrors[name]) {
      setEditErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditErrors({})

    try {
      // Validar que no esté vacío
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setEditErrors({ firstName: 'Los campos no pueden estar vacíos' })
        setEditLoading(false)
        return
      }

      const updatedUser = await authService.updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName
      })

      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Perfil actualizado correctamente',
        timer: 1500,
        showConfirmButton: false
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      const errorMsg = error.response?.data?.message || 'Error al actualizar perfil'
      setEditErrors({ submit: errorMsg })
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg
      })
    } finally {
      setEditLoading(false)
    }
  }

  // Manejadores para cambio de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordErrors({})
    setPasswordSuccess(false)

    // Validar formulario
    const errors = validateChangePasswordForm(
      passwordForm.current_password,
      passwordForm.new_password,
      passwordForm.confirm_password
    )

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      Swal.fire({
        icon: 'error',
        title: 'Validación fallida',
        text: 'Por favor verifica los campos'
      })
      setPasswordLoading(false)
      return
    }

    try {
      await authService.changePassword(
        passwordForm.current_password,
        passwordForm.new_password,
        passwordForm.confirm_password
      )

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Contraseña actualizada correctamente',
        timer: 1500,
        showConfirmButton: false
      })

      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      setShowPasswordForm(false)
      setPasswordSuccess(true)
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      
      let errorMsg = 'Error al cambiar contraseña'
      const backendErrors = error.response?.data?.errors || {}

      if (error.response?.status === 401) {
        errorMsg = 'La contraseña actual es incorrecta'
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      }

      setPasswordErrors(backendErrors)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <p>Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Navbar />
        <div className="main-content">
          <div className="dashboard-header-content">
            <h1>Mi Perfil</h1>
            <p className="text-muted">Gestiona tu información personal y seguridad</p>
          </div>

          <Row className="g-4">
            {/* Tarjeta de información de perfil */}
            <Col lg={6}>
              <Card className="dashboard-card">
                <Card.Header className="bg-light">
                  <Card.Title className="mb-0">Información Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="profile-avatar mb-4">
                    <div className="avatar-circle">
                      {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                    </div>
                  </div>

                  {editErrors.submit && (
                    <Alert variant="danger">{editErrors.submit}</Alert>
                  )}

                  <Form onSubmit={handleEditSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                        isInvalid={!!editErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {editErrors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                        isInvalid={!!editErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {editErrors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        disabled
                      />
                      <Form.Text className="text-muted">
                        El email no puede ser modificado
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Rol</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.role === 'user' ? 'Usuario' : user.role === 'coach' ? 'Coach' : 'Administrador'}
                        disabled
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      {!isEditing ? (
                        <Button
                          variant="primary"
                          onClick={() => setIsEditing(true)}
                        >
                          Editar Perfil
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            type="submit"
                            disabled={editLoading}
                          >
                            {editLoading ? 'Guardando...' : 'Guardar Cambios'}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setIsEditing(false)
                              setFormData({
                                firstName: user.firstName || user.first_name || '',
                                lastName: user.lastName || user.last_name || '',
                                email: user.email || ''
                              })
                              setEditErrors({})
                            }}
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta de cambio de contraseña */}
            <Col lg={6}>
              <Card className="dashboard-card">
                <Card.Header className="bg-light">
                  <Card.Title className="mb-0">Seguridad</Card.Title>
                </Card.Header>
                <Card.Body>
                  <h6 className="mb-3">Cambiar Contraseña</h6>
                  <p className="text-muted small">
                    Actualiza tu contraseña regularmente para mantener tu cuenta segura.
                  </p>

                  {passwordSuccess && (
                    <Alert variant="success" onClose={() => setPasswordSuccess(false)} dismissible>
                      Contraseña actualizada correctamente
                    </Alert>
                  )}

                  {!showPasswordForm ? (
                    <Button
                      variant="warning"
                      onClick={() => setShowPasswordForm(true)}
                      className="w-100"
                    >
                      Cambiar Contraseña
                    </Button>
                  ) : (
                    <Form onSubmit={handlePasswordSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña Actual</Form.Label>
                        <Form.Control
                          type="password"
                          name="current_password"
                          placeholder="Ingresa tu contraseña actual"
                          value={passwordForm.current_password}
                          onChange={handlePasswordChange}
                          required
                          isInvalid={!!passwordErrors.current_password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {passwordErrors.current_password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="new_password"
                          placeholder="Mínimo 8 caracteres, mayúscula y número"
                          value={passwordForm.new_password}
                          onChange={handlePasswordChange}
                          required
                          isInvalid={!!passwordErrors.new_password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {passwordErrors.new_password}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted d-block mt-1">
                          Mínimo 8 caracteres, debe contener mayúscula y número
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          placeholder="Confirma tu nueva contraseña"
                          value={passwordForm.confirm_password}
                          onChange={handlePasswordChange}
                          required
                          isInvalid={!!passwordErrors.confirm_password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {passwordErrors.confirm_password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          type="submit"
                          disabled={passwordLoading}
                        >
                          {passwordLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setShowPasswordForm(false)
                            setPasswordForm({
                              current_password: '',
                              new_password: '',
                              confirm_password: ''
                            })
                            setPasswordErrors({})
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Profile
