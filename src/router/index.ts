import { createRouter, createWebHashHistory } from 'vue-router'
import BlogView from '../views/BlogView.vue'

export const routes = [
  {
    path: '/',
    name: 'Blog',
    component: BlogView
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../views/ToolView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
