<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :disabled="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer/>
            <v-tooltip>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" large target="_blank" v-on="on">
                  registration
                  <v-icon right>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-form v-on:submit.prevent="onSubmit">
            <v-card-text>
              <v-text-field
                v-model="user"
                label="Login"
                name="login"
                prepend-icon="md-svg-account"
                type="text"
              />

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="md-svg-lock"
                type="password"
                clearable
              />
              <v-input v-if="error" error>{{error}}</v-input>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      if (!this.user || !this.password)
        return (this.error = "Please complete all fields");
      this.error = "";
      this.fetchUser({ username: this.username, password: this.password });
    }
  }
};
</script>