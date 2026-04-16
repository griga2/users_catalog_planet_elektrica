import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/client'
import { debug } from '@/utils/debug'

export const useUserStore = defineStore('user', () => {

  const base_url = import.meta.env.VITE_SERVER_HOST
  const user = reactive({
    role: null,
    token: null,
    name: null,
    id: null
  })

  const userExit = () => {
    user.id = null
    user.name = null
    user.role = null
    user.token = null
    localStorage.removeItem('token')
  }

  const setUser = (token) => {
    debug('setUser token:', token)
    localStorage.setItem('token', token)
  }

  const putToken = () => {
    const token = localStorage.getItem('token')
    user.token = token
    debug('putToken:', user.token)
  }

  const getUser = async () => {
    if (!user.token) putToken()
    debug('getUser token:', user.token)
    if (user.token) {
      try {
        const response = await apiClient.post('/auth/getUserDate')
        user.name = response.data.name
        user.role = response.data.role
        user.id = response.data.id
      } catch (error) {
        debug('Error getUser:', error)
        throw error
      }
    }
  }

  const UpdateBio = async (bio) => {
    debug('UpdateBio:', bio)
    if (user.token) {
      try {
        await apiClient.put('/catalog/updateBio', {
          userId: user.id,
          bio: bio
        })
      } catch (error) {
        debug('Error UpdateBio:', error)
        throw error
      }
    }
  }

  const Login = async (login, pass) => {
    try {
      const response = await apiClient.post('/auth/loginUser', {
        login: login,
        password: pass,
      })

      if (response.data) {
        setUser(response.data.access_token)
        user.token = response.data.access_token
      }

      await getUser()
    } catch (error) {
      debug('Error Login:', error)
      throw error
    }
  }

  return {
    user,
    userExit,
    UpdateBio,
    getUser,
    setUser,
    Login
  }
})
