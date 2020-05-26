<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p v-if="loading"> Loading ... </p>
    <RegistrationUI v-if="view===1" @login='view=0' v-on:submit='create'/>
    <LoginUI v-if="view===0"  @registration='view=1' @forgotPassword="view=2" />
    <ForgotPasswordUI v-if="view===2" @submit="forgotPassword" @login='view=0' />
    
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUI from '@/components/LoginUI.vue'
import RegistrationUI from '@/components/RegistrationUI.vue'
import ForgotPasswordUI from '@/components/ForgotPasswordUI.vue'
import {mapGetters} from 'vuex'
import { createUser,resetPassword } from '../Api'
export default {
  name: 'Login',
  components: {
    LoginUI,
    RegistrationUI,
    ForgotPasswordUI
  },
  data(){
    return {
      view:0
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
    forgotPassword(user){
      resetPassword(user,err => {
        if(err) return console.error(err)
        this.view = false
      })
    },
    create(user){
      createUser(user,(err)=>{
        if(err) return console.error(err)
        this.view = 0
       })
    }
  },
}
</script>
