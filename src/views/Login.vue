<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p v-if="loading"> Loading ... </p>
    <LoginUI />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUI from '@/components/LoginUI.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Login',
  components: {
    LoginUI
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    loading(){
      return this.$store.state.isFetching
    },
    ...mapGetters(['getUser']),
  }
}
</script>
