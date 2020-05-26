<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :disabled="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{t("changePassword")}}</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form v-on:submit.prevent="onSubmit">
            <v-card-text>
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
              <v-btn type="submit" color="primary"> {{t("changePassword")}}</v-btn>
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
    loading:Boolean
  },
  data() {
    return {
      password: "",
      repeatePassword:'',
      error: ""
    };
  },

  methods: {
    onSubmit() {
      if (!this.password || this.repeatePassword !== this.password)
        return (this.error = "Please complete all fields");
      this.error = "";
      this.$emit('submit',{ password: this.password });
    }
  }
};
</script>