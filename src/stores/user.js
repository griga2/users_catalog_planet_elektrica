import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  
  const base_url = import.meta.env.VITE_SERVER_HOST
  const user = reactive({
    role: null,
    token: null,
    name: null,
    id: null
  });

  const userExit = () => {
    user.id = null;
    user.name = null;
    user.role = null;
    user.token = null;

    localStorage.removeItem('token');
  }

  const setUser = async (token) => {
    console.log(token)
    await localStorage.setItem('token',token);
  }

  const PutToken = async () => {
    user.token = await (JSON.stringify(localStorage.getItem('token')));
    console.log(user.token)
  }

  const getUser = async () => {
      if (!user.token) await PutToken();
      console.log(user.token)
      if (user.token) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${base_url}/auth/getUserDate`,
            headers:{
              'Authorization':  user.token,
            }
          }
          const a = await axios.request(config);
      user.name = a.data.name;
      user.role = a.data.role;
      user.id = a.data.id;
    }
  }

  const UpdateBio = async (bio, status) => {
    console.log(bio);
    if (user.token) {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${base_url}/catalog/updateBio`,
            headers:{
              'Authorization':  user.token,
            },
            data:{
              userId: user.id,
              bio: bio,
              statis: status
            }
          }
          const a = await axios.request(config);
    }
  }

  

  const Login = async (login, pass) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/auth/loginUser`,
      data: {
        login: login,
        password: pass,
      }
    }
    const a = await axios.request(config)

    if (a.data) {
      await setUser(a.data.access_token);
      user.token = a.data.access_token;
    }

    await getUser();
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
