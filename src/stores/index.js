import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/client'
import { debug } from '@/utils/debug'

const base_url = import.meta.env.VITE_SERVER_HOST

export const useWorkerStore = defineStore('worker', () => {

  const users = ref([])
  const catalog = ref([])
  const show_branch_info = ref(false)
  const current_catalog = ref(null)
  const current_role = ref(null)
  const current_user = ref(null)
  const open_time_branch = ref([])
  const roles = ref([])
  const branch_buffer = ref(null)
  const finding = ref(false)
  const login_user = ref(null)

  // Loading states
  const isLoading = ref(false)
  const isUpdating = ref(false)

  const insertBranch = async () => {
    try {
      isLoading.value = true
      const response = await apiClient.put('/catalog/insertBranch', null, {
        params: {
          newFatherId: current_catalog.value.id,
          branchId: branch_buffer.value
        }
      })
      catalog.value = response.data
    } catch (error) {
      debug('Error insertBranch:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const moveBranch = async (direction) => {
    try {
      await apiClient.get('/catalog/moveBranch', {
        params: {
          branchId: current_catalog.value.id,
          direction: direction === 'down' ? -1 : 1,
        }
      })
    } catch (error) {
      debug('Error moveBranch:', error)
      throw error
    }
  }

  const deleteBranch = async () => {
    try {
      await apiClient.delete('/catalog/deleteBranch', {
        params: {
          branch: current_catalog.value.id
        }
      })
    } catch (error) {
      debug('Error deleteBranch:', error)
      throw error
    }
  }

  const addBranch = async () => {
    try {
      await apiClient.post('/catalog/addBranch', null, {
        params: {
          branch: current_catalog.value.id
        }
      })
    } catch (error) {
      debug('Error addBranch:', error)
      throw error
    }
  }

  const getBranches = async () => {
    try {
      isLoading.value = true
      const response = await apiClient.get('/catalog/branches')
      catalog.value = response.data
    } catch (error) {
      debug('Error getBranches:', error)
      catalog.value = []
    } finally {
      isLoading.value = false
    }
  }

  const getBranch = async (id) => {
    try {
      isLoading.value = true
      const response = await apiClient.get('/catalog/branch', {
        params: {
          branch: id
        }
      })
      current_catalog.value = response.data
    } catch (error) {
      debug('Error getBranch:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getUsers = async () => {
    try {
      isLoading.value = true
      users.value = []
      finding.value = false
      const response = await apiClient.get('/catalog', {
        params: {
          branch: current_catalog.value.id
        }
      })
      users.value = response.data
      current_user.value = null
    } catch (error) {
      debug('Error getUsers:', error)
      users.value = []
    } finally {
      isLoading.value = false
    }
  }

  const SearchUser = async (text, open, date) => {
    try {
      isLoading.value = true
      const params = open ? { text } : { text, date: date || null }
      const response = await apiClient.get('/catalog/search', { params })
      current_catalog.value = null
      users.value = response.data
      finding.value = true
    } catch (error) {
      debug('Error SearchUser:', error)
      users.value = []
    } finally {
      isLoading.value = false
    }
  }

  const updateBranch = async () => {
    try {
      isUpdating.value = true
      await apiClient.put('/catalog/branch', {
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
      }, {
        params: {
          branchId: current_catalog.value.id
        }
      })
    } catch (error) {
      debug('Error updateBranch:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось обновить данные филиала',
          duration: 3000,
        })
      }
      throw error
    } finally {
      isUpdating.value = false
    }
  }

  const UpdateContact = async (contact) => {
    try {
      isUpdating.value = true
      const response = await apiClient.put('/catalog/contact', {
        id: contact[0],
        type: contact[1],
        value: contact[2],
        userId: current_user.value.ID
      })
      current_user.value.Contacs = response.data
    } catch (error) {
      debug('Error UpdateContact:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось обновить контакт',
          duration: 3000,
        })
      }
      throw error
    } finally {
      isUpdating.value = false
    }
  }

  const updateUser = async () => {
    try {
      isUpdating.value = true
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
        on_leave: current_user.value.OnLeave,
        leave_text: current_user.value.LeaveText,
        leave_start: current_user.value.LeaveStart,
        leave_finish: current_user.value.LeaveFinish,
        bio: current_user.value.Bio
      }
      debug('updateUser data:', data)
      await apiClient.put('/catalog/user', data, {
        params: {
          userId: current_user.value.ID
        }
      })
    } catch (error) {
      debug('Error updateUser:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось обновить данные сотрудника',
          duration: 3000,
        })
      }
      throw error
    } finally {
      isUpdating.value = false
    }
  }

  const updateBranchStruct = async (newFather) => {
    try {
      const response = await apiClient.put('/branch_struct', null, {
        params: {
          branch: current_catalog.value.id,
          fatherId: newFather,
        }
      })
      users.value = response.data
    } catch (error) {
      debug('Error updateBranchStruct:', error)
      throw error
    }
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
    try {
      isLoading.value = true
      const response = await apiClient.get('/catalog/roles')
      roles.value = response.data
    } catch (error) {
      debug('Error getRoles:', error)
      roles.value = []
    } finally {
      isLoading.value = false
    }
  }

  const updateUserRole = async () => {
    try {
      await apiClient.put('/catalog/userRole', {
        role: current_user.value.role
      }, {
        params: {
          userId: current_user.value.ID
        }
      })
    } catch (error) {
      debug('Error updateUserRole:', error)
      throw error
    }
  }

  const addRoles = async () => {
    try {
      const response = await apiClient.post('/catalog/role')
      roles.value = response.data
    } catch (error) {
      debug('Error addRoles:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось создать роль',
          duration: 3000,
        })
      }
      throw error
    }
  }

  const moveRoles = async (role, axis) => {
    try {
      const response = await apiClient.put('/catalog/move_role', {
        role: role,
        axis: axis
      })
      roles.value = response.data
    } catch (error) {
      debug('Error moveRoles:', error)
      throw error
    }
  }

  const uploadFile = async (image) => {
    try {
      isUpdating.value = true
      const body = new FormData()
      body.append('image', image)

      const response = await apiClient.post('/catalog/upload_photo/' + current_user.value.ID, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      current_user.value.Photo = ''
      current_user.value.Photo = response.data.Photo
    } catch (error) {
      debug('Error uploadFile:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось загрузить фото',
          duration: 3000,
        })
      }
      throw error
    } finally {
      isUpdating.value = false
    }
  }

  const addUser = async () => {
    try {
      isUpdating.value = true
      const data = {
        departament: current_catalog.value.id,
      }
      debug('addUser data:', data)
      await apiClient.post('/catalog/add_user', data)
      await getUsers()
    } catch (error) {
      debug('Error addUser:', error)
      if (window.$notification) {
        window.$notification.error({
          title: 'Ошибка',
          content: 'Не удалось добавить сотрудника',
          duration: 3000,
        })
      }
      throw error
    } finally {
      isUpdating.value = false
    }
  }

  const removeUserStart = async () => {
    try {
      const body = {
        em_id: current_user.value.ID,
      }
      await apiClient.post('/catalog/remove_user/' + current_user.value.ID, body)
    } catch (error) {
      debug('Error removeUserStart:', error)
      throw error
    }
  }

  const hiringEmployer = async () => {
    try {
      const body = {
        em_id: current_user.value.ID,
        roleID: current_user.value.role.id,
        hrMail: login_user.value?.contacts?.find(el => el[1] === 'email')?.[1] || null
      }
      await apiClient.post('/catalog/hiring_employer', body)
    } catch (error) {
      debug('Error hiringEmployer:', error)
      throw error
    }
  }

  const clickArrow = (id) => {
    debug(id, 'clickArrow')
    catalog.value = catalog.value.map((el) => {
      el = findAndChangeArrow(el, id)
      return el
    })
  }

  const findAndChangeArrow = (catalogItem, id) => {
    if (catalogItem.id === id) {
      catalogItem.is_open = !catalogItem.is_open
    }
    if (catalogItem.children) {
      catalogItem.children = catalogItem.children.map((el) => {
        el = findAndChangeArrow(el, id)
        return el
      })
    }
    return catalogItem
  }

  const addRole = async () => {
    try {
      const response = await apiClient.post('/catalog/addRole')
      if (response.status === 201) {
        await getRoles()
      }
      debug('addRole result:', response.data.raw[0].id)
      current_role.value = roles.value.find((el) => {
        debug('role id:', el.id)
        return response.data.raw[0].id === el.id
      })
    } catch (error) {
      debug('Error addRole:', error)
      throw error
    }
  }

  const updateRole = async () => {
    try {
      const data = {
        id: current_role.value.id,
        name: current_role.value.name
      }
      await apiClient.post('/catalog/updateRole', data)
    } catch (error) {
      debug('Error updateRole:', error)
      throw error
    }
  }

  return {
    clickArrow,
    updateRole,
    removeUserStart,
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
    login_user,
    isLoading,
    isUpdating,
  }
})
