<template>
    <v-item-group :mandatory="madatory" :value="value">
        <v-item  v-for="e in status" :key='e._id' :value="e._id" v-slot:default="{ active}">
              <v-btn :class="{default:defaultValue===e._id}" @click="()=>{$emit('input',e._id)}" :color="active ? 'primary':''">{{e.name}}</v-btn>
           
          </v-item>
      
  </v-item-group>
</template>
<script>
import { mapGetters, } from 'vuex'
export default {
    props:['value','defaultValue','madatory'],
    data(){
        return {
        }
    },
    created(){
      this.$store.dispatch('status/fetch')
    },
    computed:{
      ...mapGetters({getStatus:'status/get'}),
      status(){
        return this.getStatus()
      }
    }
}
</script>
<style scoped>
.default {
    background-color:#c0c0c0 
}
</style>
