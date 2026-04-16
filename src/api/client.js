import axios from 'axios'
import { useUserStore } from '@/stores/user'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
  timeout: 30000,
  maxBodyLength: Infinity,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/catalog'
      } else if (status === 500) {
        if (window.$notification) {
          window.$notification.error({
            title: 'Ошибка сервера',
            content: 'Внутренняя ошибка сервера. Попробуйте позже.',
            duration: 5000,
          })
        }
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
