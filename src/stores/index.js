import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const base_url = import.meta.env.VITE_SERVER_HOST
export const useWorkerStore = defineStore('worker', () => {

  const users = ref([])
  const catalog = ref([])
  const show_branch_info = ref(false)
  const current_catalog = ref(null)
  const current_role = ref(null)
  const current_user = ref(null)
  const open_time_branch = ref([])
  const roles = ref([]);
  const branch_buffer = ref(null)

  const insertBranch = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/insertBranch`,
      params:{
        newFatherId: current_catalog.value.id,
        branchId: branch_buffer.value  
      }
    }
    const a = await axios.request(config);
    catalog.value = a.data;
  }

  const moveBranch = async (direction) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/moveBranch`,
      params:{
        branchId: current_catalog.value.id,
        direction: direction == 'down' ? -1 : 1,
      }
    }
    const a = await axios.request(config);
  }
  
  const deleteBranch = async () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/deleteBranch`,
      params:{
        branch: current_catalog.value.id
      }
    }
    const a = await axios.request(config);
  }

  const addBranch = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/addBranch`,
      params:{
        branch: current_catalog.value.id
      }
    }
    const a = await axios.request(config);
  }

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
    users.value = [];

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
    current_user.value = null;
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

  const updateBranch = async () => {
    console.log(current_catalog.value)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/branch`,
      data:{
        name: current_catalog.value.name,
        address: current_catalog.value.adress,
        workDays: getWorkDaysObject(),
        timeOffset: current_catalog.value.timeOffset,
        isStorage: current_catalog.value.isStorage,
        isOfficePurchase: current_catalog.value.isOfficePurchase,
        isOfficeDepartment: current_catalog.value.isOfficeDepartment,
        oid: current_catalog.value.oid,
        id_vesta: current_catalog.value.id_vesta,
        database_vesta: current_catalog.value.database_vesta,
        sql_server_vesta: current_catalog.value.sql_server_vesta,
        cfo: current_catalog.value.cfo,
        city: current_catalog.value.city,
        email: current_catalog.value.email,
      },
      params: {
        branchId: current_catalog.value.id
      }
    }
    const a = await axios.request(config); 
    // users.value = a.data;
  }

  const UpdateContact = async (contact) => {
    console.log(current_user.value)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/contact`,
      data:{
        id: contact[0],
        type: contact[1],
        value: contact[2],
        userId: current_user.value.ID
      },
    }
    const a = await axios.request(config); 
    current_user.value.Contacs = a.data;
  }

  const updateUser = async () => {
    console.log(current_user.value)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/user`,
      data:{
        last_name: current_user.value.LastName,
        first_name: current_user.value.Name,
        second_name: current_user.value.MidName,
        birthday: current_user.value.Birthday,
        status: current_user.value.Status,
        photo: current_user.value.Photo,
        sex: current_user.value.Sex,
        city: current_user.value.City,
        employment_date: current_user.value.EmploymentDate,
      },
      params: {
        userId: current_user.value.ID
      }
    }
    const a = await axios.request(config); 
    // users.value = a.data;
  }

  const updateBranchStruct = async (newFather) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/branch_struct`,
      params:{
        branch: current_catalog.value.id,
        fatherId: newFather,
      }
    }
    const a = await axios.request(config);
    users.value = a.data;
  }

  const getWorkDaysObject = () => {
    return {
      monFriday: current_catalog.value.monFriday,
      saturday: current_catalog.value.saturday,
      sunday: current_catalog.value.sunday,
      monFridayOpenning: current_catalog.value.monFridayOpenning,
      monFridayClosing: current_catalog.value.monFridayClosing,
      saturdayOpenning: current_catalog.value.saturdayOpenning,
      saturdayClosing: current_catalog.value.saturdayClosing,
      sundayOpenning: current_catalog.value.sundayOpenning,
      sundayClosing: current_catalog.value.sundayClosing,

    }
  }

  const getRoles = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/roles`
    }
    const a = await axios.request(config);
    roles.value = a.data;
  }

  const updateRole = async () => {
    console.log(current_user.value)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/userRole`,
      data:{
        role: current_user.value.role
      },
      params: {
        userId: current_user.value.ID
      }
    }
    const a = await axios.request(config); 
  }

  const addRoles = async () => {
    let config = {
      method: 'push',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/role`
    }
    const a = await axios.request(config);
    roles.value = a.data;
  }

  const moveRoles = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/move_role`
    }
    const a = await axios.request(config);
    roles.value = a.data;
  }

  const updateRoles = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/role`
    }
    const a = await axios.request(config);
    roles.value = a.data;
  }

  const uploadFile = async (image) => {
    console.log(image)
    const body = new FormData();
    body.append('image', image)
    console.log(body)
    const cur_user_id = current_user.value.ID;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/upload_photo/` + current_user.value.ID,
      data: body,
      headers:{
        'Content-Type': 'multipart/form-data;',
      }
    }
    const rez  = await axios.request(
      config
    );
    current_user.value.Photo = '',
    current_user.value.Photo = rez.data.Photo;
    console.log(current_user.value.Photo);
  }

  // console.log(image)
  //       const body = new FormData();
  //       body.append('image', image)
  //       console.log(body)

  //       let config = {
  //           method: 'post',
  //           maxBodyLength: Infinity,
  //           url: `${base_url}/api/image?articul=${id}`,
  //           data: body,
  //           headers:{
  //               'Content-Type': 'multipart/form-data;',
  //           }
  //       };

  //       const rez  = await axios.request(
  //           config
  //       );

  return {
    moveBranch,
    deleteBranch,
    uploadFile,
    updateBranchStruct,
    addBranch,
    insertBranch,
    UpdateContact,
    branch_buffer,
    catalog,
    show_branch_info,
    current_catalog,
    getBranches,
    users,
    updateRole,
    getUsers,
    open_time_branch,
    SearchUser,
    updateBranch,
    updateUser,
    current_user,
    roles,
    getRoles,
    current_role
  }
})