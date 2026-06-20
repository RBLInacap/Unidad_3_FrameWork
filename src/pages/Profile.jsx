import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Container, Card, Form, Button } from 'react-bootstrap'
import Header from '../components/Header'
import Swal from 'sweetalert2'
import './Profile.css'

const Profile = () => {
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aquí iría la llamada al servicio para actualizar
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Perfil actualizado correctamente',
        timer: 1500,
        showConfirmButton: false
      })
      setIsEditing(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar perfil'
      })
    } finally {
      setLoading(false)
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
    <div className="profile-page-container">
      <Header />
      <Container className="profile-container py-5">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
        </div>

        <Card className="profile-card">
          <Card.Body>
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="text"
                  value={user.role}
                  disabled
                />
              </Form.Group>

              <div className="profile-actions">
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
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email
                        })
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
      </Container>
    </div>
  )
}

export default Profile
