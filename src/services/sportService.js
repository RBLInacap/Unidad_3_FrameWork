import apiClient from './apiClient'

export const sportService = {
  // Listar todos los deportes
  getAll: async (filters = {}) => {
    const response = await apiClient.get('/sports', { params: filters })
    return response.data
  },

  // Obtener un deporte por ID
  getById: async (id) => {
    const response = await apiClient.get(`/sports/${id}`)
    return response.data
  },

  // Crear un nuevo deporte
  create: async (sportData) => {
    const response = await apiClient.post('/sports', sportData)
    return response.data
  },

  // Actualizar un deporte
  update: async (id, sportData) => {
    const response = await apiClient.put(`/sports/${id}`, sportData)
    return response.data
  },

  // Eliminar un deporte
  delete: async (id) => {
    const response = await apiClient.delete(`/sports/${id}`)
    return response.data
  },

  // Cambiar estado de un deporte
  updateStatus: async (id, status) => {
    const response = await apiClient.patch(`/sports/${id}/status`, { status })
    return response.data
  }
}

export default sportService
