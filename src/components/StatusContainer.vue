<template>
    <v-item-group :mandatory="madatory" :value="value">
    <v-container>
      <v-row>
        <v-col
          v-for="e in status"
          :key="e._id"
          cols="12"
          md="4"
        >
          <v-item :value="e._id" v-slot:default="{ active}">
              <v-btn :class="{default:defaultValue===e._id}" @click="()=>{$emit('input',e._id)}" :color="active ? 'primary':''">{{e.name}}</v-btn>
           
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script>
export default {
    props:['value','defaultValue','madatory'],
    data(){
        return {
            status:[{
                _id:1,
                name:'To do'
                },{
                _id:2,
                name:'Doing'
                },{
                _id:3,
                name:'Done'
                }]
        }
    }
}
</script>
<style scoped>
.default {
    background-color:#c0c0c0 
}
</style>
