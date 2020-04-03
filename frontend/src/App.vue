<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
        <div  class='link'>
          <router-link v-for="(router,index) in routers" :key="index" :to="router.path" v-slot="{ href, route, navigate, isExactActive ,}">
            <v-btn :color="isExactActive  ? 'secondary':'primary'" @click="navigate">{{route.name}}</v-btn>
          </router-link>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content v-if="init">
      <Login v-if="!getUser"/>
      <transition v-else :name="transitionName"  mode="out-in">
      <router-view />
      </transition>
      
    </v-content>
  </v-app>
</template>

<script>
import Login from '@/views/Login.vue'
import {mapGetters, mapActions} from 'vuex'
import {routes} from '@/router'
export default {
  name: 'App',

  components: {
    Login
  },
  data(){
    return {
      transitionName:'right-to-left'
    }
  },
  created(){
    this.session()
  },
  computed: {
    ...mapGetters(['getUser','init']),
    routers(){
      if(!this.getUser) return []
      if(this.getUser && this.getUser.admin) return routes
      return routes.filter(r => !r.admin)
    }
  },
  methods: {
    ...mapActions(['session'])
  },
  watch:{
    '$route'(to,from){
      let toIndex = routes.findIndex(e => e.path===to.path)
      let fromIndex = routes.findIndex(e => e.path===from.path)
      this.transitionName = toIndex<fromIndex ? 'left-to-right':'right-to-left'
    }
  }
};
</script>

<style scoped>
.link {
  padding-left: 10px;
}
.link a{
  padding-right: 10px;
  text-decoration: none;
  color: white
}
.isActive {
  color:blueviolet
}
.left-to-right-enter-active, .left-to-right-leave-active  {
  transition: .2s ease-in; 
}
.left-to-right-enter{
  opacity: 0;
  transform: translate(-400px,0)
} 
.left-to-right-leave-to /* .left-to-right-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(400px,0)
}

.right-to-left-enter-active, .right-to-left-leave-active  {
  transition: .2s ease-in; 
}
.right-to-left-enter{
  opacity: 0;
  transform: translate(400px,0)
} 
.right-to-left-leave-to /* .right-to-left-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-400px,0)
}

</style>