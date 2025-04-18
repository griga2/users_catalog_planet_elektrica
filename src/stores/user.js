import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const base_url = import.meta.env.VITE_SERVER_HOST
  const user = reactive({
    role: 'hr',
    token: 'auth',
    name: 'Пользователь'
  });

  const setUser = async (token) => {
    await localStorage.setItem('token',token);
  }

  const getUser = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/auth/login`,
      headers:{
        authorization: 'Bearer ' + user.token,
      }
    }
    const a = await axios.request(config);
    user.name = a.data.name;
    user.role = a.data.role;
  }

  const Login = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/auth/login`,
      data: {
        ...user,
      }
    }
    await setUser(a.data);
    user.token = a.data;
    await getUser();
  }

  return {
    user,
    getUser,
    setUser,
    Login
  }
})
