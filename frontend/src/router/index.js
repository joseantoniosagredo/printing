import Vue from 'vue'
import VueRouter from 'vue-router'

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

    path: '/',
    name: 'myOrders',
    component: () => import('../views/MyOrders.vue'),
    meta: {
      admin: false
    }
  },
  {

    path: '/new',
    name: 'newOrder',
    component: () => import('../views/NewOrder.vue'),
    meta: {
      admin: false
    }
  },
  {

    path: '/admin/order',
    name: 'allOrders',
    component: () => import('../views/AllOrderAdmin.vue'),
    meta: {
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

export default router
