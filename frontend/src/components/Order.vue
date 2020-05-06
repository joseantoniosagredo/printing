<template>
  <v-card :disabled="readOnly!==true && closed">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-subtitle>id: {{_id}}</v-list-item-subtitle>
        <v-list-item-title class="headline mb-1">{{user.name}}</v-list-item-title>
        <v-list-item-subtitle>{{datePaser}}</v-list-item-subtitle>

        <table>
          <tr>
            <td>
              <label>{{t("phone")}}</label>
            </td>
            <td>{{user.phone}}</td>
          </tr>
          <tr>
            <td>
              <label>{{t("email")}}</label>
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
        <table>
          <tr>
            <th>Files</th>
            <th>Color</th>
            <th>Bind</th>
            <th>Copies</th>
            <th>Double side</th>
          </tr>
          <tr v-for="fileObj in files" v-bind:key="fileObj._id">
            <td>
              <a target="_blank" :href="fileObj.file.path">{{fileObj.file.originalName}}</a>
            </td>
            <td>
              {{fileObj.color ? t('Yes'): t('No')}}
            </td>
            <td>
              {{fileObj.bind ?  t('Yes'): t('No')}}
            </td>
            <td>
              {{fileObj.copies}}
            </td>
            <td>
              {{fileObj.doubleSided ?  t('Yes'): t('No')}}
            </td>
          </tr>
        </table>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <StatusContainer
        v-if="readOnly!==true"
        mandatory
        :defaultValue="status._id"
        v-model="internalStatus"
      />
      <v-btn v-else disabled>{{status.name}}</v-btn>
      <v-btn color="green" :disabled="modified">
        Save
        <v-icon right>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
      <div class="flex"/>
      <p>{{price}}€</p>
    </v-card-actions>
  </v-card>
</template>

<script>
import StatusContainer from "@/components/StatusContainer.vue";
/**
 * {
        bind: { type: Boolean, required: true },
        color: { type: Boolean, required: true },
        copies: { type: Number, required: true },
        doubleSided: { type: Boolean, required: true },
        file: { 
          originalName:{ type: Number, required: true },
          path:{ type: Number, required: true },
         },
    }
 */
export default {
  components: {
    StatusContainer
  },
  data() {
    return {
      internalStatus: -1
    };
  },
  created() {
    this.internalStatus = this.status._id;
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
    files: Array,
    date: { type: Date, required: true },
    options: {
      double: Boolean
    },
    closed: { type: Boolean, required: true },
    readOnly: { type: Boolean },
    price:{ type: Number, required: true },
  },
  computed: {
    modified() {
      return this.internalStatus === this.status._id;
    },
    datePaser() {
      let date = new Date(this.date);
      return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
    },
    
  }
};
</script>

<style scoped>
label {
  font-weight: bold;
}
.flex {
  flex: 1 1 auto;
}
</style>
