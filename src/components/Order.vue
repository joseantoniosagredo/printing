<template>
  <v-card :disabled="readOnly!==true && closed">
    <v-list-item three-line>
         <v-list-item-content> 
         <v-list-item-title class="headline mb-1">{{user.name + ' - ' + fileName}}</v-list-item-title>
        <v-list-item-subtitle >{{date.toLocaleString()}}</v-list-item-subtitle>

    <table>     
      <tr>
        <td>
          <label>Phone</label>
        </td>
        <td>{{user.phone}}</td>
      </tr>
      <tr>
        <td>
          <label>Email</label>
        </td>
        <td>{{user.email}}</td>
      </tr>
      <tr v-for="(value,key) in options" v-bind:key="key">
        <td>
          <label>{{key}}</label>
        </td>
        <td>{{value}}</td>
      </tr>
    </table>
    </v-list-item-content>
   </v-list-item>
    
    <v-card-actions>
      <v-btn outlined>Download File <v-icon right>mdi-download</v-icon></v-btn>
      <StatusContainer v-if="readOnly!==true" mandatory :defaultValue="status._id" v-model="internalStatus"/>
      <v-btn v-else disabled>{{status.name}}</v-btn>
      <v-btn color='green' :disabled="modified"> Save <v-icon right>mdi-checkbox-marked-circle</v-icon></v-btn>
      
      
    </v-card-actions>
  </v-card>
</template>

<script>
import StatusContainer from "@/components/StatusContainer.vue";
export default {
  components: {
    StatusContainer
  },
  data(){
      return {
          internalStatus:-1
      }
  },
  created(){
      this.internalStatus = this.status._id
  },
  props: {
    _id: { type: String, required: true },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true }
    },
    status: {
        _id: { type: Number, required: true },
      name: { type: String, required: true },
      acctionNeeded: { type: Boolean, required: true }
    },
    file: { type: String, required: true },
    fileName: { type: String, required: true },
    date:{type:Date, required:true},
    options: {
      double: Boolean
    },
    closed:{type:Boolean, required:true},
    readOnly:{type:Boolean}
  },
  computed: {
      modified(){
          return this.internalStatus === this.status._id
      }
  }
};
</script>

<style scoped>

label {
  font-weight: bold;
}
</style>
