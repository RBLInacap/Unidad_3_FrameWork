import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Recuperar usuario de localStorage al cargar
  useEffect(() => {
    const loadAuthenticatedUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const profile = await authService.getProfile()
        localStorage.setItem('user', JSON.stringify(profile))
        setUser(profile)
        setIsAuthenticated(true)
        console.log('[AuthContext] Usuario restaurado desde /auth/me')
      } catch (error) {
        console.error('[AuthContext] No se pudo restaurar usuario desde /auth/me:', error)
        authService.logout()
      } finally {
        setLoading(false)
      }
    }

    loadAuthenticatedUser()
  }, [])

  const login = async (email, password) => {
    try {
      console.log('[AuthContext] Iniciando login para:', email)
      const response = await authService.login(email, password)

      if (!response || !response.user || !response.token) {
        throw new Error('Respuesta de login inválida')
      }

      setUser(response.user)
      setIsAuthenticated(true)
      console.log('[AuthContext] Login exitoso para:', response.user.email)

      return response
    } catch (error) {
      console.error('[AuthContext] Error de login:', error)
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      console.log('[AuthContext] Registrando usuario:', userData.email)
      const response = await authService.register(userData)
      console.log('[AuthContext] Registro exitoso')
      return response
    } catch (error) {
      console.error('[AuthContext] Error de registro:', error)
      throw error
    }
  }

  const logout = () => {
    console.log('[AuthContext] Logout de usuario')
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
