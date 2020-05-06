<template>
  <div>
    <OrderTable editable :data="orders" :options.sync="options" @delete="handleDelete" @status="handleStatus">
      <template v-slot:top>
        <v-toolbar dense>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-text-field label="Name" v-model="search" />
          <StatusContainer :value="status" @input="(id)=>status=status===id?null:id" />
        </v-toolbar>
      </template>
    </OrderTable>
  </div>
</template>

<script>
import OrderTable from "@/components/OrderTable.vue";
import StatusContainer from "@/components/StatusContainer.vue";
import { mapGetters, mapActions } from "vuex";
import { closeOrder,patchOrder } from '@/Api';
export default {
  components: {
    OrderTable,
    StatusContainer
  },
  data() {
    return {
      options: {},
      status: null,
      search: "",
      page: 1,
      rowPerPage: 25
    };
  },
  mounted() {
    this.$store.dispatch("adminOrder/fetch", this.queryString);
  },
  updated() {
    this.$store.dispatch("adminOrder/fetch", this.queryString);
  },
  computed: {
    ...mapGetters({ getOrder: "adminOrder/get" }),
    orders() {
      let order = this.getOrder(this.queryString);
      if (order) return order.data;
      return [];
    },
    queryString() {
      let json = {};
      if (this.status) json.status = this.status;
      if (this.search) json.search = this.search;
      /**
        groupBy: (...)
        groupDesc: (...)
        itemsPerPage: (...)
        multiSort: (...)
        mustSort: (...)
        page: 1
        sortBy: (...)
        sortDesc: (...)
       */
      if (this.options.page) json.page = this.options.page;
      if (this.options.itemsPerPage) json.pageSize = this.options.itemsPerPage;
      if (this.options.sortBy) json.sortBy = this.options.sortBy;
      if (this.options.sortDesc) json.sortDesc = this.options.sortDesc;

      return new URLSearchParams(json).toString();
    }
  },
  methods: {
    ...mapActions({invalidateOrder:'adminOrder/invalidateAll'}),
    handleDelete(id){
      closeOrder(id,err=>{
        if(err) return console.error(err)
        this.invalidateOrder()
      })
    },
    handleStatus({orderId,id}){
      patchOrder(orderId,{status:id},(err)=>{
        if(err) return console.error(err)
        this.invalidateOrder()
      })
    }
  },
  watch: {
    options() {
      console.log(this.options);
    }
  }
};
</script>
