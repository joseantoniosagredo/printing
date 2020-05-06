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
            <v-btn :color="isExactActive  ? 'secondary':'primary'" @click="navigate">{{t(route.name)}}</v-btn>
          </router-link>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="getUser"
        text
      >
        <span class="mr-2">{{getUser.name}}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-menu :close-on-content-click="true">
        <template v-slot:activator="{on}">
      <v-btn icon v-on="on">
         <v-icon>mdi-web</v-icon>
      </v-btn>
        </template>
         <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="()=>setLanguage(item.lang)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
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
      transitionName:'right-to-left',
      items: [
        { title: 'Español', lang:'es' },
        { title: 'English', lang:'en' },
      ],
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
      return routes.filter(r => !r.meta.admin)
    }
  },
  methods: {
    ...mapActions(['session','setLanguage'])
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