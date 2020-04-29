<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <v-toolbar dense>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-text-field label="Name" v-model="filter" />
          <StatusContainer :value="status" @input="(id)=>status=status===id?null:id" />
        </v-toolbar>
      </v-row>
      <OrderTable :data="filteredOrder"/>
    </v-col>
  </v-container>
</template>
<script>
import StatusContainer from "@/components/StatusContainer";
import OrderTable from "@/components/OrderTable";

import { mapGetters } from "vuex";
export default {
  components: {
    StatusContainer,
    OrderTable,
  },
  data() {
    return {
      status: null,
      filter: "",
    };
  },
  mounted() {
    this.$store.dispatch('order/fetch')
  },
  computed: {
    ...mapGetters({getOrders:'order/get',isFetchingOrders:'order/isFetching'}),
    filteredOrder() {
      return this.orders.filter(e => {
        if (this.status && this.status !== e.status._id) return false;
        if (this.filter)
          return (
            e.user.name.toUpperCase().indexOf(this.filter.toUpperCase()) >= 0
          );
        return true;
      });
    },
    loading(){
      return this.isFetchingOrders()
    },
    orders(){
      return this.getOrders()
    }
  }
};
</script>
<style scoped>
</style>
