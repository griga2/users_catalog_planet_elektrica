import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const base_url = 'http://localhost:3000'
export const useWorkerStore = defineStore('worker', () => {

  const users = ref([])
  const catalog = ref([])
  const show_branch_info = ref(false)
  const current_catalog = ref('')

  const getBranches = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/branches`,
    };

    const a = await axios.request(
      config
  );

  catalog.value = a.data;
  }

  const getUsers = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog`,
      params:{
        branch: current_catalog.value.id
      }
    }
    const a = await axios.request(config);
    users.value = a.data;
  }


  const SearchUser = async (text) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/search`,
      params:{
        text: text
      }
    }
    const a = await axios.request(config);
    current_catalog.value = null;
    users.value = a.data;
  }

  return {
    catalog,
    show_branch_info,
    current_catalog,
    getBranches,
    users,
    getUsers,
    SearchUser
  }
})