import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export const authService = {
  async register(data: RegisterData) {
    try {
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { error: 'Registrierung fehlgeschlagen' }
    }
  },

  async login(data: LoginData) {
    try {
      const response = await api.post('/auth/login', data)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error: any) {
      throw error.response?.data || { error: 'Login fehlgeschlagen' }
    }
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken() {
    return localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

export default api
