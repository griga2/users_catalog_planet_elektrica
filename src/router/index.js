import { createRouter, createWebHistory } from 'vue-router'
import WorkerCatalogView from '@/views/WorkerCatalogView/WorkerCatalogView.vue'
import LayoutView from '@/views/LayoutView/LayoutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'layout',
      component: LayoutView,
      children:[
        {
          path: '/catalog',
          name: 'layout',
          component: WorkerCatalogView,
        },
      ]
    },

  ]
})

export default router
