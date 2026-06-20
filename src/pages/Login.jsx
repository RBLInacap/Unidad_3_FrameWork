import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { validateLoginForm } from '../utils/validators'
import Swal from 'sweetalert2'
import logoSportClub from '../../assets/logoSportClub.png'
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
      
      if (!response || !response.user) {
        throw new Error('Respuesta inválida del servidor')
      }

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
        navigate('/dashboard/user')
      }
    } catch (error) {
      console.error('Error de login:', error)
      
      let errorMessage = 'Error al iniciar sesión'
      let errorTitle = 'Error de autenticación'

      // Manejar diferentes tipos de errores
      if (error.response) {
        const status = error.response.status
        const data = error.response.data
        
        switch (status) {
          case 400:
            errorTitle = 'Validación fallida'
            errorMessage = data?.message || data?.errors?.email || 'Datos inválidos'
            break
          case 401:
            errorTitle = 'Credenciales inválidas'
            errorMessage = data?.message || 'El email o la contraseña son incorrectos'
            break
          case 404:
            errorTitle = 'Usuario no encontrado'
            errorMessage = 'No existe una cuenta con este email'
            break
          case 500:
            errorTitle = 'Error del servidor'
            errorMessage = 'El servidor está experimentando problemas. Intenta más tarde'
            break
          default:
            errorMessage = data?.message || 'Error inesperado'
        }
      } else if (error.request) {
        errorTitle = 'Error de conexión'
        errorMessage = 'No se puede conectar al servidor. Verifica tu conexión a internet'
      } else {
        errorMessage = error.message || 'Error desconocido'
      }

      setErrors({ submit: errorMessage })
      Swal.fire({
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
        confirmButtonText: 'Entendido'
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
            <div className="auth-logo-container" onClick={() => navigate('/')}>
              <img src={logoSportClub} alt="SportClub" className="auth-logo" />
            </div>
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
                className="w-100 mb-3 auth-submit-btn"
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
