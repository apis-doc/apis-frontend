import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHelloWorld from '../views/vue.vue'
import UserView from '@/views/UserView.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 作为登录页
    path: '/',
    name: 'home',
    component: VueHelloWorld
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue'),
    children: [
      { path: 'user', component: UserView }
    ]
  },
  {
    path: '/vue',
    name: 'vue',
    component: VueHelloWorld
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
