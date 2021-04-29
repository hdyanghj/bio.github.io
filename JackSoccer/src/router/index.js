// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//     history: createWebHashHistory(),
//     router: [
//         { path: '/', component: () => import('views/jackpot-soccer.vue') }
//     ]
// })
// export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/jackpot-soccer.vue'

const routes = [
  {
    path: '/',
    name: 'jackpotsoccer',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
