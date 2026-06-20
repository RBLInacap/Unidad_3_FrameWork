import apiClient from './apiClient'

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      
      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token
        const user = response.data.data.user
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        return {
          token,
          user
        }
      } else if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data
      }
      
      throw new Error('Respuesta inválida del servidor')
    } catch (error) {
      // Limpiar tokens si hay error
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error al parsear usuario:', error)
      localStorage.removeItem('user')
      return null
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  getUserRole: () => {
    const user = authService.getCurrentUser()
    return user?.role || null
  },

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await apiClient.put('/auth/me/password', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/me', userData)
      if (response.data && response.data.data) {
        const updatedUser = response.data.data
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return updatedUser
      }
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default authService
