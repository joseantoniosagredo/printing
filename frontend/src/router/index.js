import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import * as paths from './paths'
Vue.use(VueRouter)

export const routes = [
  /*{
    path: '/order',
    name: 'Order',
    component: () => import('../views/OrdersView.vue'),
    beforeEnter: (to, from, next) => {
      if (state.getters.getUser && state.getters.getUser.admin)
        console.log('Autorizado')
      else
        console.log('NO Autorizado')
      next(true)
    },
    meta: {
      admin: true
    }
  },*/

  {

    path: paths.getMyOrdersPath(),
    name: 'myOrders',
    component: () => import('../views/MyOrders.vue'),
    meta: {
      header: true,
      auth: true,
      admin: false
    }
  },
  {

    path: paths.getNewOrderPath(),
    name: 'newOrder',
    component: () => import('../views/NewOrder.vue'),
    meta: {
      header: true,
      auth: true,
      admin: false
    }
  },
  {

    path: paths.getAllOrdersPath(),
    name: 'allOrders',
    component: () => import('../views/AllOrderAdmin.vue'),
    meta: {
      header: true,
      auth: true,
      admin: true
    }
  },
  {

    path: paths.getLoginPath(),
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      header: false,
      admin: true
    }
  },
  {
    path: paths.getVerifyUserPath(),
    name: 'VerifyUser',
    component: () => import('../views/Welcome.vue'),
    meta: {
      header: false,
      admin: true
    }
  },
  {
    path: '/user/password/',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword.vue'),
    meta: {
      header: false,
      admin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to) => {
  window.document.title = 'IV: ' + to.name
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.auth)) {
    const process = () => {
      if (!store.getters.getUser) {
        next({ name: 'Login' })
      }
      else
        next()
    }
    if(store.getters.init) return process()
    store.watch((state,getters)=>getters.init, function () {
      process()
    })
  }
  else if(store.getters.getUser)
    next({name:'myOrders'})
  else
    next()
    
})

export default router
