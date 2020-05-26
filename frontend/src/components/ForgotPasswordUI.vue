<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :disabled="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{t("loginForm")}}</v-toolbar-title>
            <v-spacer/>
               <v-btn large target="_blank" @click="$emit('login')">
                  {{t("back-to-login")}}
                  <v-icon right>mdi-code-tags</v-icon>
                </v-btn>
           
          </v-toolbar>
          <v-form v-on:submit.prevent="onSubmit">
            <v-card-text>
              <v-text-field
                v-model="user"
                :label="t('email')"
                name="login"
                prepend-icon="md-svg-account"
                type="text"
              />
              <v-input v-if="error" error>{{error}}</v-input>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn type="submit" color="primary">{{t("change-password")}}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { resetPassword } from '../Api'
export default {
  props: {
    source: String
  },
  data() {
    return {
      user: "",
      password: "",
      error: ""
    };
  },
  computed: {
    ...mapGetters(['isFetching']),
    loading() {
      return this.isFetching
    }
  },
  methods: {
    ...mapActions(["fetchUser"]),
    onSubmit() {
      if (!this.user )
        return (this.error = "Please complete all fields");
      this.error = "";
      resetPassword(this.user,err => {
        if(err) return this.error = 'ha habido algun error'
      })
    }
  }
};
</script>