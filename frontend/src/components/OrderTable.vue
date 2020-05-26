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
    <template v-if="editable" v-slot:item.status="{item}">
      <StatusContainer :value="item.statusId" :disabled="item.closed" @input="(id)=>onChangeStatus(item._id,id)" />
    </template>
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td class="row-table" :colspan="headers.length">
        <v-data-table :items="item.files" :headers="fileHeaders" item-key="_id" disable-pagination>
          <template v-if="editable" v-slot:item.link="{ item }">
            <a v-if="!item.deleted"  target="_blank" :href="item.path">
              <v-btn icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </a>
            <v-btn v-else :disabled="item.deleted"  icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
          </template>
        </v-data-table>
      </td>
    </template>
  </v-data-table>
</template>
<script>
import StatusContainer from '@/components/StatusContainer'
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
  components:{
    StatusContainer
  },
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
        { text: this.t("name"), value: "name" },
        { text: this.t("email"), value: "email" },
        { text: this.t("phone"), value: "phone" },
        { text: this.t("date"), value: "date" },
        { text: this.t("price"), value: "price" },
        { text: this.t("status"), value: "status" }
      ].concat(this.editable ? [{ text: this.t("actions"), value: "action" }] : []),
      fileHeaders: [
        { text: this.t("name"), value: "originalName" },
        { text: this.t("bind"), value: "bind" },
        { text: this.t("color"), value: "color" },
        { text: this.t("copies"), value: "copies" },
        { text: this.t("doubleSide"), value: "doubleSided" },
        { text: this.t("stapled"), value: "stapled" },
        { text: this.t("group"), value: "group" }
      ].concat(this.editable ? [{ text: this.t("download"), value: "link" }] : [])
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
        statusId:row.status._id,
        files: row.files.map(f => ({ ...f, ...f.file,
          bind:f.bind ? this.t('yes'):this.t('no'),
          color:f.color ? this.t('yes'):this.t('no'),
          doubleSided:f.doubleSided ? this.t('yes'):this.t('no'),
          stapled:f.stapled ? this.t('yes'):this.t('no')

        }))
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
    },
    onChangeStatus(orderId,id){
      this.$emit('status',{orderId,id})
    }
  },
};
</script>
<style scoped>
.row-table {
  padding: 5px 5%;
}
a {
  text-decoration: none;
}
</style>