import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { validateRegisterForm, getPasswordErrors } from '../../utils/validators'
import apiClient from '../../services/apiClient'
import Swal from 'sweetalert2'
import logoSportClub from '../../../assets/logoSportClub.png'
import '../Auth.css'

const CrearUsuario = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [passwordErrors, setPasswordErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }

    if (name === 'password') {
      setPasswordErrors(value ? getPasswordErrors(value) : [])
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()

    const formErrors = validateRegisterForm(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      formData.confirmPassword
    )

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      Swal.fire({
        icon: 'error',
        title: 'Validación',
        text: 'Por favor verifica los campos'
      })
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      await apiClient.post('/auth/register', {
        full_name: fullName,
        email: formData.email,
        password: formData.password,
        role: 'user'
      })

      Swal.fire({
        icon: 'success',
        title: '¡Usuario creado! ',
        text: 'El usuario ha sido registrado correctamente.',
        timer: 1700,
        showConfirmButton: false
      })
      navigate('/dashboard/admin/usuarios')
    } catch (error) {
      console.error('Error creando usuario:', error)
      const data = error.response?.data
      const message = data?.message || 'No se pudo crear el usuario'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Container className="auth-form-container">
        <Card className="auth-card">
          <Card.Body>
            <div className="auth-logo-container" onClick={() => navigate('/dashboard/admin')}>
              <img src={logoSportClub} alt="SportClub" className="auth-logo" />
            </div>
            <h2 className="text-center mb-4">Crear Usuario</h2>

            <Form onSubmit={handleCreateUser}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                {passwordErrors.length > 0 && (
                  <small className="text-danger d-block mt-2">
                    {passwordErrors.map((err, idx) => (
                      <div key={idx}>• {err}</div>
                    ))}
                  </small>
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 mb-3 auth-submit-btn"
                type="submit"
                disabled={loading || passwordErrors.length > 0}
              >
                {loading ? 'Cargando...' : 'Crear Usuario'}
              </Button>
            </Form>

            <div className="text-center">
              <Button variant="link" onClick={() => navigate('/dashboard/admin/usuarios')}>
                Volver a la lista de usuarios
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default CrearUsuario
