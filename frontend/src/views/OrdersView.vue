<template>
  <v-container>
    <v-col cols="12" >
      <v-row>
        <v-toolbar dense>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-text-field label='Name' v-model="filter" />
          <StatusContainer :value="status" @input="(id)=>status=status===id?null:id"/>
        </v-toolbar>
      </v-row>
      <v-divider class="mx-4" vertical></v-divider>
      <v-row>
        <v-col v-for="order in fiteredOrders" v-bind:key="order._id">
          <Order v-bind="order" />
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Order from "@/components/Order";
import StatusContainer from "@/components/StatusContainer";
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    StatusContainer,
    Order
  },
  data() {
    return {
      status: null,
        filter:'',
    };
  },
  created(){
    this.fetchOrders()
  },
  computed: {
    ...mapGetters(['orders']),
    fiteredOrders() {
      return this.orders.filter(e => {
        if (this.status && this.status !== e.status._id) return false;
        if (this.filter) return e.user.name.toUpperCase().indexOf(this.filter.toUpperCase())>=0
        return true;
      });
    }
  },
  methods:{
    ...mapActions(['fetchOrders']),
  }
};
</script>

<style scoped>
</style>
