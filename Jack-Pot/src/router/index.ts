// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//     history: createWebHashHistory(),
//     router: [
//         { path: '/', component: () => import('views/jackpot-soccer.vue') }
//     ]
// })
// export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jackpot-soccer',
    name: 'jackpot-soccer',
    component: () => import('../views/jackpot-soccer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
