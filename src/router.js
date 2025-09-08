import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', component: () => import('./components/home.vue') },
  { path: '/img1', component: () => import('./pages/img1.vue') },
  { path: '/img1-1', component: () => import('./pages/img1-1.vue') },
  { path: '/img1-2', component: () => import('./pages/img1-2.vue') },
  { path: '/img1-3', component: () => import('./pages/img1-3.vue') },
  { path: '/img1-4', component: () => import('./pages/img1-4.vue') },
  { path: '/img1-5', component: () => import('./pages/img1-5.vue') },
  { path: '/img2', component: () => import('./pages/img2.vue') },
  { path: '/img2-1', component: () => import('./pages/img2-1.vue') },
  { path: '/img2-2', component: () => import('./pages/img2-2.vue') },
  { path: '/img2-3', component: () => import('./pages/img2-3.vue') },
  { path: '/img2-4', component: () => import('./pages/img2-4.vue') },
  { path: '/img2-5', component: () => import('./pages/img2-5.vue') },
  { path: '/img3', component: () => import('./pages/img3.vue') },
  { path: '/img3-1', component: () => import('./pages/img3-1.vue') },
  { path: '/img3-2', component: () => import('./pages/img3-2.vue') },
  { path: '/img3-3', component: () => import('./pages/img3-3.vue') },
  { path: '/img3-4', component: () => import('./pages/img3-4.vue') },
  { path: '/img3-5', component: () => import('./pages/img3-5.vue') },
  { path: '/img4', component: () => import('./pages/img4.vue') },
  { path: '/img4-1', component: () => import('./pages/img4-1.vue') },
  { path: '/img4-2', component: () => import('./pages/img4-2.vue') },
  { path: '/img4-3', component: () => import('./pages/img4-3.vue') },
  { path: '/img4-4', component: () => import('./pages/img4-4.vue') },
  { path: '/img4-5', component: () => import('./pages/img4-5.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
