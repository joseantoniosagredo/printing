<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p v-if="loading"> Loading ... </p>
    <RegistrationUI v-if="registration" @login='registration=false' v-on:submit='create'/>
    <LoginUI v-else  @registration='registration=true' />
    
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUI from '@/components/LoginUI.vue'
import RegistrationUI from '@/components/RegistrationUI.vue'
import {mapGetters} from 'vuex'
import {createUser} from '@/Api'
export default {
  name: 'Login',
  components: {
    LoginUI,
    RegistrationUI
  },
  data(){
    return {
      registration:false
    }
  },
  computed:{
    ...mapGetters(['getUser','isFetching']),
    user(){
      return this.getUser
    },
    loading(){
      return this.isFetching
    },
    ...mapGetters(['getUser']),
  },
  methods: {
    create(user){
      console.log(user)
      createUser(user,(err)=>{
        if(err) return console.error(err)
       })
    }
  },
}
</script>
