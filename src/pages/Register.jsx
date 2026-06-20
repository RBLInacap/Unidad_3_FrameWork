import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { validateRegisterForm, getPasswordErrors } from '../utils/validators'
import apiClient from '../services/apiClient'
import Swal from 'sweetalert2'
import './Auth.css'

const Register = () => {
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

    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }

    // Mostrar validación de contraseña en tiempo real
    if (name === 'password') {
      setPasswordErrors(value ? getPasswordErrors(value) : [])
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    // Validar formulario (sin rol)
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
      await apiClient.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'usuario' // Asignar automáticamente como usuario
      })

      Swal.fire({
        icon: 'success',
        title: '¡Registrado!',
        text: 'Cuenta creada correctamente. Por favor inicia sesión.',
        timer: 1500,
        showConfirmButton: false
      })

      navigate('/login')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrarse'
      setErrors({ submit: errorMessage })
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
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
            <h1 className="text-center mb-4">SportClub</h1>
            <h2 className="text-center mb-4">Registrarse</h2>

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Tu nombre"
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
                  placeholder="Tu apellido"
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
                  placeholder="Contraseña (mín. 6 caracteres, 1 mayúscula, 1 número)"
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
                className="w-100 mb-3"
                type="submit"
                disabled={loading || passwordErrors.length > 0}
              >
                {loading ? 'Cargando...' : 'Registrarse'}
              </Button>
            </Form>

            <div className="text-center">
              <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Register
