import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register Page',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard Page',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/editor-dashboard',
      name: 'Dashboard Page',
      component: () => import('../views/EditorDashboardView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
