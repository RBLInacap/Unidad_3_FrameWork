import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { validateLoginForm } from '../utils/validators'
import Swal from 'sweetalert2'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Validar formulario
    const formErrors = validateLoginForm(email, password)
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
      const response = await login(email, password)
      
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Sesión iniciada correctamente`,
        timer: 1500,
        showConfirmButton: false
      })

      // Redirigir según rol
      const role = response.user.role
      if (role === 'admin') {
        navigate('/dashboard/admin')
      } else if (role === 'coach') {
        navigate('/dashboard/coach')
      } else {
        navigate('/dashboard/usuario')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
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
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors(prev => ({ ...prev, email: null }))
                  }}
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
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors(prev => ({ ...prev, password: null }))
                  }}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </Form>

            <div className="text-center">
              <p>¿No tienes cuenta? <a href="/register">Registrarse</a></p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Login
