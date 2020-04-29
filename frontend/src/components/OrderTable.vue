<template>
  <v-data-table
    :headers="headers"
    :items="computedData"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :loading="loading"
    :options.sync="internalOptions"
    item-key="_id"
    show-expand
    disable-pagination
    disable-sort
    class="elevation-1"
  >
    <template v-if="editable" v-slot:item.action="{ item }">
        <v-btn @click="()=>onDelete(item._id)" :disabled="item.closed" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      
    </template>
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td class="row-table" :colspan="headers.length">
        <v-data-table :items="item.files" :headers="fileHeaders" item-key="_id" disable-pagination>
          <template v-if="editable" v-slot:item.link="{ item }">
            <a target="_blank" :href="item.path">
              <v-btn icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </a>
          </template>
        </v-data-table>
      </td>
    </template>
  </v-data-table>
</template>
<script>
/**
 * _id: { type: String, required: true },
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
    files: {
        bind: { type: Boolean, required: true },
        color: { type: Boolean, required: true },
        copies: { type: Number, required: true },
        doubleSided: { type: Boolean, required: true },
        file: { 
          originalName:{ type: Number, required: true },
          path:{ type: Number, required: true },
         },
    },
    date: { type: Date, required: true },
    options: {
      double: Boolean
    },
    closed: { type: Boolean, required: true },
    price:{ type: Number, required: true },
 */
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    editable: Boolean,
    loading: Boolean,
    options: Object
  },
  data() {
    return {
      //options: {},
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "_id"
        },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Date", value: "date" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" }
      ].concat(this.editable ? [{ text: "Actions", value: "action" }] : []),
      fileHeaders: [
        { text: "Name", value: "originalName" },
        { text: "Bind", value: "bind" },
        { text: "Color", value: "color" },
        { text: "Copies", value: "copies" },
        { text: "Double Side", value: "doubleSided" },
        { text: "Peges in one page", value: "group" }
      ].concat(this.editable ? [{ text: "download", value: "link" }] : [])
    };
  },
  computed: {
    computedData() {
      return this.data.map(row => ({
        ...row,
        name: row.user.name,
        email: row.user.email,
        phone: row.user.phone,
        date:
          new Date(row.date).toLocaleDateString() +
          " - " +
          new Date(row.date).toLocaleTimeString(),
        price: row.price.toFixed(2) + "€",
        status: row.status.name,
        files: row.files.map(f => ({ ...f, ...f.file }))
      }));
    },
    internalOptions: {
      get() {
        return this.options;
      },
      set(value) {
        this.$emit("update:options", value);
      }
    }
  },
  methods: {
    onDelete(id){
      this.$emit('delete',id)
    }
  },
};
</script>
<style scoped>
.row-table {
  padding: 5px 5%;
}
</style>