<template>
  <v-container cols="12">
    <v-row>
      <v-col>
        <v-card class="mx-auto" outlined>
          <form @submit.prevent="submit">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Create new order</div>
                <div class="flex">
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Your information</v-list-item-title>
                    <!--<v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>-->
                    <div>
                      <label>Phone</label>
                      <p>{{getUser.phone}}</p>
                    </div>
                    <div>
                      <label>Email</label>
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
                  :dobleSided.sync="file.dobleSided"
                  :color.sync="file.color"
                  :pages='file.pages'
                />
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn type="submit" text>Submit</v-btn>
              <v-btn text>Button</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <form  @submit.prevent="onSubmitFiles">
          <v-file-input :rules="rules" name='files' v-model="files" chips multiple label="File input"></v-file-input>
          <v-btn :disabled='files.length==0' type="submit">upload files</v-btn>
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
import { pageOf } from "@/Api"
import { mapGetters, mapActions } from "vuex";
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
      rules:[
        (files)=>{
          return files.every(file => file.name.endsWith('.pdf')) ? true:'Files must be a PDF'
        }
      ]
    };
  },
  created() {
    this.fetchConfig();
  },
  computed: {
    ...mapGetters(["config", "getUser"]),
    
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
    ...mapActions(["fetchConfig"]),
    submit() {
      let options = {};
      Object.keys(this.config).forEach(key => {
        options[key] = this.values[key];
      });
      console.log(options);
      console.log(this.selected);
    },
    onSubmitFiles(){
      const data = new FormData()
      this.files.forEach(f => data.append(f.name,f))
      pageOf(data,(err,data)=>{
        if(err) console.error(err)
         this.selected = this.files.map(f => ({
          file: f,
          dobleSided: false,
          group: 1,
          bind: false,
          copies: 1,
          color:false,
          pages:parseInt(data[f.name])
        }))
      })
    },
    onRemoveFile(name){
      let index = this.selected.findIndex(e => e.file.name === name)
      if(index>=0){
        this.selected.splice(index,1)
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
  padding:5px
}
</style>