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
    path: '/ruby/omnizip',
    name: 'Omnizip',
    component: () => import('../views/OmnizipPage.vue'),
    meta: { title: 'Omnizip (Ruby) — Omnizip' },
  },
  {
    path: '/ruby/cabriolet',
    name: 'Cabriolet',
    component: () => import('../views/CabrioletPage.vue'),
    meta: { title: 'Cabriolet — Omnizip' },
  },
  {
    path: '/ruby/excavate',
    name: 'Excavate',
    component: () => import('../views/ExcavatePage.vue'),
    meta: { title: 'Excavate — Omnizip' },
  },
  // Bare repo-name paths are owned in production by the org's docs sites
  // (GitHub Pages serves them at /<repo>/), so the SPA pages live under
  // /ruby/. These redirects keep pre-existing in-app links working.
  { path: '/omnizip', redirect: '/ruby/omnizip' },
  { path: '/cabriolet', redirect: '/ruby/cabriolet' },
  { path: '/excavate', redirect: '/ruby/excavate' },
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
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/blog/BlogPost.vue'),
    meta: { title: 'Blog — Omnizip' },
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
