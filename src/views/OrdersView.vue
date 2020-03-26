<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <v-toolbar dense>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-text-field label='Name' v-model="filter" />
          <StatusContainer :value="status" @input="(id)=>status=status===id?null:id"/>
        </v-toolbar>
      </v-row>
      <v-divider class="mx-4" vertical></v-divider>
      <v-row>
        <Order v-for="order in fiteredOrders" v-bind="order" v-bind:key="order._id"/>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Order from "@/components/Order";
import StatusContainer from "@/components/StatusContainer";
export default {
  components: {
    StatusContainer,
    Order
  },
  data() {
    return {
      status: null,
        filter:'',
      orders: [
        {
          _id: "111111111a",
          user: {
            name: "Jose Antonio",
            phone: 111222333,
            email: "asdfas@asdf.es"
          },
          file: "/api/file/1",
          fileName: "CV_Jose.pdf",
          pages: 10,
          status: {
            _id: 1,
            name: "Hecho",
            acctionNeeded: false
          },
          closed: false,
          date:new Date(),
          options: {
            double: true
          }
        },
        {
          _id: "222222222",
          user: {
            name: "Jose Antonio",
            phone: 111222333,
            email: "asdfas@asdf.es"
          },
          file: "/api/file/1",
          fileName: "CV_Jose.pdf",
          pages: 10,
          date:new Date(),
          status: {
            _id: 2,
            name: "Hecho",
            acctionNeeded: false
          },
          closed: true,
          options: {
            double: true
          }
        }
      ]
    };
  },
  computed: {
    fiteredOrders() {
      return this.orders.filter(e => {
        if (this.status && this.status !== e.status._id) return false;
        if (this.filter) return e.user.name.toUpperCase().indexOf(this.filter.toUpperCase())>=0
        return true;
      });
    }
  }
};
</script>

<style scoped>
</style>
