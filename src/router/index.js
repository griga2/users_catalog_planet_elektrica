import { createRouter, createWebHistory } from 'vue-router'
import WorkerCatalogView from '@/views/WorkerCatalogView/WorkerCatalogView.vue'
import OrgStructView from '@/views/OrgStructView/OrgStructView.vue'
import LayoutView from '@/views/LayoutView/LayoutView.vue'
import EditUsersView from '@/views/EditUsersView/EditUsersView.vue'
import RolesView from '@/views/OrgStructView copy/RolesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'layout',
      component: LayoutView,
      children:[
        {
          path: '/catalog',
          name: 'catalog',
          component: WorkerCatalogView,
        },{
          path: '/edit_struct',
          name: 'editor',
          component: OrgStructView,
        },{
          path: '/edit_workers',
          name: 'edit_workers',
          component: EditUsersView,
        },{
          path: '/edit_roles',
          name: 'edit_roles',
          component: RolesView,
        }
      ]
    },

  ]
})

export default router
