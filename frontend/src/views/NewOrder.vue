<template>
  <v-container cols="12">
    <v-row>
      <v-col>
        <v-card class="mx-auto" outlined>
          <form @submit.prevent="submit">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{t("newOrder")}}</div>
                <div class="flex">
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{t("yourInformation")}}</v-list-item-title>
                    <!--<v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>-->
                    <div>
                      <label>{{t("phone")}}</label>
                      <p>{{getUser.phone}}</p>
                    </div>
                    <div>
                      <label>{{t("email")}}</label>
                      <p>{{getUser.email}}</p>
                    </div>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                </div>
                <div v-if="config">
                  <InputCustom
                    v-for="(value,key) in config.options"
                    :key="key"
                    :label="key"
                    :type="value"
                    v-model="values[key]"
                  />
                </div>
                <FileCard
                  v-for="file in selected"
                  :key="file.file.name"
                  :file="file.file"
                  :group.sync="file.group"
                  :copies.sync="file.copies"
                  :bind.sync="file.bind"
                  :doubleSided.sync="file.doubleSided"
                  :color.sync="file.color"
                  :pages="file.pages"
                />
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn @click="submitOrder">{{t("submit")}} : {{price}}€</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <form @submit.prevent="onSubmitFiles">
            <v-file-input
              :rules="rules"
              name="files"
              v-model="files"
              chips
              multiple
              :label="t('fileInput')"
            ></v-file-input>
            <v-btn :disabled="files.length==0" type="submit">{{t("upload")}}</v-btn>
          </form>
          <FilesTable :selected="selected" @delete="onRemoveFile" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputCustom from "@/components/InputCustom";
import FilesTable from "@/components/FilesTable";
import FileCard from "@/components/FileCard";
import {calculatePrice} from '@/utils'
import { pageOf, postOrder } from "@/Api";
import { mapGetters, mapActions } from "vuex";
var id = 1
export default {
  components: {
    InputCustom,
    FilesTable,
    FileCard
  },
  data() {
    return {
      selected: [],
      values: {},
      files: [],
      rules: [
        files => {
          return files.every(file => file.name.endsWith(".pdf"))
            ? true
            : "Files must be a PDF";
        }
      ]
    };
  },
  created() {
    this.$store.dispatch('config/fetch');
  },
  computed: {
    ...mapGetters({getConfig:"config/get", getUser:"getUser"}),
    config(){
      return this.getConfig()
    },
    price(){
      return calculatePrice(this.selected,this.config).toFixed(2)
    }
  },
  watch: {
    config() {
      if (this.config && this.config.options)
        Object.keys(this.config.options).forEach(key =>
          this.$set(this.values, key, "")
        );
    }
  },
  methods: {
    ...mapActions({invalidateOrders:'order/invalidateAll'}),
    submitOrder() {
      let options = {};
      if (this.config)
        Object.keys(this.config).forEach(key => {
          options[key] = this.values[key];
        });
      const data = new FormData();
      
      data.append('metadata',JSON.stringify(this.selected.map(e => {
        const {file,...metadata} = e // eslint-disable-line 
        return metadata
      })))
        
      //THere are no problem because all file ended in .pdf
      this.selected.forEach(f => data.append(f.id, f.file));
      postOrder(data, () => {
        this.invalidateOrders()
        this.$router.push({ name: 'My Orders' });

      });
    },
    onSubmitFiles() {
      const data = new FormData();
      this.files.forEach(f => data.append(f.name, f));
      pageOf(data, (err, data) => {
        if (err) console.error(err);
        this.selected = this.files.filter(f =>data[f.name]!==undefined ).map(f => ({
          file: f,
          doubleSided: false,
          group: 1,
          bind: false,
          copies: 1,
          color: false,
          id: id++,
          pages: parseInt(data[f.name])
        }));
        if(this.files.length!==this.files.filter(f =>data[f.name]!==undefined )) console.warn('Some file is not a PDF')
      });
    },
    onRemoveFile(name) {
      let index = this.selected.findIndex(e => e.file.name === name);
      if (index >= 0) {
        this.selected.splice(index, 1);
      }
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
label {
  display: inline-block;
  padding-right: 10px;
  font-weight: bold;
}
p {
  display: inline-block;
}
.fileCard {
  padding: 5px;
}
</style>