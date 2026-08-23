import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Omnizip — Pure Ruby & Rust Compression' },
  },
  {
    path: '/omnizip',
    name: 'Omnizip',
    component: () => import('../views/OmnizipPage.vue'),
    meta: { title: 'Omnizip (Ruby) — Omnizip' },
  },
  {
    path: '/cabriolet',
    name: 'Cabriolet',
    component: () => import('../views/CabrioletPage.vue'),
    meta: { title: 'Cabriolet — Omnizip' },
  },
  {
    path: '/rust',
    name: 'Rust',
    component: () => import('../views/RustPage.vue'),
    meta: { title: 'omnizip-rs — Pure Rust Codecs — Omnizip' },
  },
  {
    path: '/blog',
    name: 'BlogIndex',
    component: () => import('../views/blog/BlogIndex.vue'),
    meta: { title: 'Blog — Omnizip' },
  },
  {
    path: '/blog/omnizip-rs-announcement',
    name: 'BlogOmnizipRs',
    component: () => import('../views/blog/OmnizipRsAnnouncement.vue'),
    meta: { title: 'Announcing omnizip-rs — Omnizip' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
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

router.afterEach((to) => {
  document.title = to.meta.title || 'Omnizip'
})

export default router
