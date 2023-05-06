import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import BlogView from '../views/BlogView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Blog' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView
  },
  {
    path: '/widget',
    name: 'Widget',
    component: () => import('../views/WidgetView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/blogContent',
    name: 'BlogContent',
    component: () => import('../views/BlogContentView.vue'),
    props: route => ({ title: route.query.title })
  },
  {
    path: '/widgetContentView',
    name: 'WidgetContentView',
    component: () => import('../views/WidgetContentView.vue'),
    props: route => ({ name: route.query.name })
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
