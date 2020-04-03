<template >
  <div class="model">
    <form @submit.prevent="handleSubmit">
        <table>
            <tr>
                <td>   <label>Name</label></td>
                <td>  <input v-model="username" placeholder="Name" required/></td>
            </tr>
            <tr >
                <td> <label>Password</label></td>
                <td class="tooltipContainer" style="display:flex position:abosolute">
                  <input :class={passwordError} v-model="password" :type=typeInput placeholder="Password"/>
                  <Icon @click="changeInput" :name='typeInput==="password" ? "visibility" : "visibility-off"'/>
                  <transition class="transition">
                    <p class=tooltip v-if="passwordErrorMessage">{{passwordErrorMessage}}</p>
                  </transition>
                  </td>
            </tr>
            <tr>
                <td>  <label>Repeate Password</label></td>
                <td class="tooltipContainer">    
                  <input v-model="repeatePassword" :type=typeInput placeholder="Password"/>
                  <transition class="transition">
                    <p class=tooltip v-if="repeatePaswordError">{{repeatePaswordError}}</p>
                  </transition>
                  </td>
            </tr>
        </table>
        <div>
            <button type='submit'>Submit</button>
        </div>
    </form>
  </div>
</template>
<script>
import Icon from '@/components/Icon'
import {mapActions} from 'vuex'

export default {
  name: "Login",
  components:{
    Icon
  },
  data:function() {
    return {
      typeInput: "password",
      username:'',
      password:'',
      repeatePassword:''
    };
  },
  computed: {
    passwordError(){
      return this.password!=='' && (!/[a-zA-Z]/.test(this.password) || !/[0-9]/.test(this.password))
    },
    passwordErrorMessage(){
      if(this.passwordError)
        return 'Password need a letter and a number'
      return ''
    },
    repeatePaswordError(){
      if(this.repeatePassword!=='' && this.password !== this.repeatePassword)
        return 'Password are diferents'
      return ''
    }
  },
  methods: {
    ...mapActions(['fetchUser']),
    changeInput:function() {
      this.typeInput = this.typeInput === "password" ? "text" : "password";
    },
    handleSubmit(){
      if(!this.passwordError && !this.repeatePaswordError)
        this.fetchUser({username:this.username,})
    }
  }
};
</script>

<style scoped>
.model {
  margin: auto;
  max-width: 500px;
  border: solid black 1px;
  padding: 10px
}
.model form {
    display:flex;
    flex-direction: column
}
.model table {
  text-align: left
}
.model label {
  font-weight: bold 
}
.passwordError {
  border-color: red
}
.tooltipContainer{
  position: relative;
  display: flex;
}
.tooltip {
  position: absolute;
  top:10px;
  color:red;
  background-color: rgba(0, 0, 0, 0.11);
  z-index: 3;
  left:80px
}
.transition-enter, .transition-leave-to{
  opacity: 0;
}
.transition-enter-active, .transition-leave-active {
  transition: all .5s ease
}

</style>