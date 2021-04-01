// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//     history: createWebHashHistory(),
//     router: [
//         { path: '/', component: () => import('views/jackpot-soccer.vue') }
//     ]
// })
// export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jackpotsoccer',
    name: 'JACKPOT BÓNG ĐÁ',
    component: () => import('../views/jackpot-soccer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
