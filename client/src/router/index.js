import Vue from 'vue'
import Router from 'vue-router'
import Singup from '@/components/Singup'
import Login from '@/components/Login'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Singup',
      component: Singup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/:id',
      name: 'info',
      component: Info
    }
  ]
})
