<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :disabled="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{t("registrationForm")}}</v-toolbar-title>
            <v-spacer/>
                <v-btn :href="source" large target="_blank" @click="$emit('login')">
                  {{t("login")}}
                  <v-icon right>mdi-code-tags</v-icon>
                </v-btn>
            
          </v-toolbar>
          <v-form v-on:submit.prevent="onSubmit">
            <v-card-text>
              <v-text-field
                v-model="name"
                :label="t('name')"
                name="name"
                prepend-icon="md-svg-account"
                type="text"
              />
                <v-text-field
                v-model="email"
                :label="t('email')"
                name="email"
                prepend-icon="md-svg-account"
                type="email"
              />
               <v-text-field
                v-model="phone"
                id="phone"
                :label="t('phone')"
                name="phone"
                prepend-icon="md-svg-phone"
                type="number"
                clearable
              />
              <v-text-field
                v-model="password"
                :label="t('password')"
                name="password"
                prepend-icon="md-svg-lock"
                type="password"
              />
              <v-text-field
                v-model="repeatePassword"
                id="password"
                :label="t('repeatePassword')"
                name="password"
                prepend-icon="md-svg-lock"
                type="password"
                clearable
              />
              
              <v-input v-if="error" error>{{error}}</v-input>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn type="submit" color="primary"> {{t("newUser")}}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String,
    loading:Boolean
  },
  data() {
    return {
      name: "",
      password: "",
      repeatePassword:'',
      email:'',
      phone:null,
      error: ""
    };
  },

  methods: {
    onSubmit() {
      if (!this.name || !this.password || !this.name || !this.phone || this.repeatePassword !== this.password)
        return (this.error = "Please complete all fields");
      this.error = "";
      this.$emit('submit',{ name: this.name, password: this.password, email:this.email, phone:this.phone });
    }
  }
};
</script>