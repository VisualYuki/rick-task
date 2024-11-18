import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Restart from '@/views/Restart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Game,
    },
    {
      path: '/restart',
      component: Restart,
    },
  ],
})

export default router
