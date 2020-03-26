import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import state from '@/store/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    }
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
