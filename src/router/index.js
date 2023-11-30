import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHelloWorld from '../views/vue.vue'
import UserView from '@/views/UserView.vue'
import ApiView from '@/views/ApiView.vue'
import ProjectView from '@/views/ProjectView.vue'
import LogView from '@/views/LogView.vue'
import MeView from '@/views/MeView.vue'
import UserConfigView from '@/views/UserConfigView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DocView from '@/views/DocView'

Vue.use(VueRouter)

const routes = [
  {
    // 作为登录页
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/api-manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue'),
    children: [
      {
        path: 'api',
        component: ApiView
      },
      {
        path: 'doc',
        component: DocView
      },
      {
        path: 'project',
        component: ProjectView
      },
      {
        path: 'log',
        component: LogView
      },
      {
        path: 'me',
        component: MeView
      },
      {
        path: 'user-config',
        component: UserConfigView
      },
      {
        path: 'home',
        component: HomeView
      },
      {
        path: 'users',
        component: UserView
      }
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
