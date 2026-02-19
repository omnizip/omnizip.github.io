import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/omnizip',
    name: 'Omnizip',
    component: () => import('../views/OmnizipPage.vue'),
  },
  {
    path: '/cabriolet',
    name: 'Cabriolet',
    component: () => import('../views/CabrioletPage.vue'),
  },
]

const history = typeof window !== 'undefined'
  ? createWebHistory()
  : createMemoryHistory()

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  },
})

export default router
