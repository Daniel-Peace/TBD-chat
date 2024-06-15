import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToDoView from '@/views/ToDoView.vue'
import DatabaseCommunicatorView from '@/views/DatabaseCommunicatorView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list',
    name: 'list',
    component: ToDoView,
  },
  {
    path: '/database',
    name: 'database',
    component: DatabaseCommunicatorView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
