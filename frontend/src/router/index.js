import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import state from '@/store/login'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    admin:false
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    admin:false
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/OrdersView.vue'),
    beforeEnter:(to, from, next) =>{
      if (state.getters.getUser && state.getters.getUser.admin)
        console.log('Autorizado')
      else
        console.log('NO Autorizado')
      next(true)
    },
    admin:true
  },
  {
    
    path: '/new',
    name: 'New Order',
    component: () => import('../views/NewOrder.vue'),
    admin:false
  },
  {
    
    path: '/profile/orders',
    name: 'My Orders',
    component: () => import('../views/MyOrders.vue'),
    admin:false
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to)=>{
  window.document.title = 'IV: ' + to.name
})
export default router
