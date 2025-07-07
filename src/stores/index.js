import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"
import { find } from 'naive-ui/es/_utils/cssr'

const base_url = import.meta.env.VITE_SERVER_HOST
export const useWorkerStore = defineStore('worker', () => {

  const users = ref([])
  const catalog = ref([{name:"Категория", id: "123", children:[{name:"Категория1", id: "1234", children:[{name:"Категория2", id: "1234"}], have_children:true,is_open: true}],have_children:true,is_open: true}])
  const show_branch_info = ref(false)
  const current_catalog = ref(null)
  const current_role = ref(null)
  const current_user = ref(null)
  const open_time_branch = ref([])
  const roles = ref([]);
  const branch_buffer = ref(null)
  const finding = ref(false);
  const login_user = ref(false);

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

  const getBranch = async (id) => {
 let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/branch`,
      params:{
        branch: id
      }
    }
    const a = await axios.request(config);
    current_catalog.value = a.data;
  } 

  const getUsers = async () => {
    users.value = [];
    finding.value = false;
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

  const SearchUser = async (text, open, date) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/search`,
      params: open ? {
        text: text
      } : {
         text: text,
         date: date ? date: null,
      }
    }
    const a = await axios.request(config);
    current_catalog.value = null;
    users.value = a.data;
    finding.value = true;

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
    console.log(current_user.value.MidName)
    const data = {
        last_name: current_user.value.LastName,
        first_name: current_user.value.Name,
        second_name: current_user.value.MidName,
        birthday: current_user.value.Birthday,
        status: current_user.value.Status,
        photo: current_user.value.Photo,
        sex: current_user.value.Sex,
        city: current_user.value.City,
        employment_date: current_user.value.EmploymentDate,
        visible_user: current_user.value.visible_user,
      };
      console.log(data);
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/user`,
      data: data,
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

  const updateUserRole = async () => {
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

  const moveRoles = async (role,axis) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/move_role`,
      data: {
        role: role,
        axis: axis
      }
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

  const addUser = async () => {
    const data = {
      departament: current_catalog.value.id,
    };
    console.log(data,'add user aaa')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/add_user`,
      data: data,

    }
    const rez = await axios.request(
      config
    );
    await getUsers();
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

  const firstDayStart = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/first_day_start/` + current_user.value.ID,
      data: body,
      headers:{
      }
    }
    const rez  = await axios.request(
      config
    );
  }

const removeUserStart = async () => {

  const body = {
      em_id: current_user.value.ID,
    }
    
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/remove_user/` + current_user.value.ID,
      data: body,
      headers:{
      }
    }
    const rez  = await axios.request(
      config
    );
  }

  const hiringEmployer = async () => {

    const body = {
      em_id: current_user.value.ID,
      roleID: current_user.value.role.id,
      hrMail: login_user.value?.contacts?.find(el => el[1] == 'email')[1] || null
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/hiring_employer`,
      data: body,
      headers:{
      }
    }
    const rez  = await axios.request(
      config
    );
  }

const ClickArrow = (id) => {
  console.log(id,'ClickArrow')
  catalog.value = catalog.value.map((el) => {el = findAndChenchArrow(el, id); return el;})
  // catalog.map(el => {if (el.id == value) el.is_open = !el.is_open; return el})
}

const findAndChenchArrow = (catalog, id) => {
  // console.log(catalog.id,id)
  
  if(catalog.id == id) {
    catalog.is_open = !catalog.is_open;
  }
  if (catalog.children) {
    catalog.children = catalog.children.map((el) => {el = findAndChenchArrow(el,id); return el})
  }
  return catalog;
}

const addRole = async () => {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/addRole`,
      headers:{
      }
    }
    const rez  = await axios.request(
      config
    );
    if(rez.status === 201) {
      await getRoles();
    }
    console.log(rez.data.raw[0].id)
    current_role.value = roles.value.find((el) => {console.log(el.id); return rez.data.raw[0].id == el.id});
}

const updateRole = async () => {
    const data = {
      id: current_role.value.id,
      name: current_role.value.name
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${base_url}/catalog/updateRole`,
      data: data
    }
    const rez  = await axios.request(
      config
    );
}


  return {
    ClickArrow,
    updateRole,
    removeUserStart,
    firstDayStart,
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
    addRole,
    getBranches,
    users,
    getBranch,
    getUsers,
    open_time_branch,
    SearchUser,
    updateBranch,
    updateUser,
    current_user,
    roles,
    getRoles,
    current_role,
    updateUserRole,
    finding,
    moveRoles,
    hiringEmployer,
    addUser,
    
  }
})