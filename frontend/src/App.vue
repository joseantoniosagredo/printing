<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <p class="display-1">Imprenta Victoria</p>
        <div class="link">
          <router-link
            v-for="(router,index) in routers"
            :key="index"
            :to="router.path"
            v-slot="{ href, route, navigate, isExactActive ,}"
          >
            <v-btn
              :color="isExactActive  ? 'secondary':'primary'"
              @click="navigate"
            >{{t(route.name)}}</v-btn>
          </router-link>
        </div>
      </div>

      <v-spacer></v-spacer>
      <v-menu v-if="getUser" :close-on-content-click="true">
        <template  v-slot:activator="{on}">
          <v-btn v-on="on"  text>
            <span class="mr-2">{{getUser.name}}</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>{{ t("logout") }} <v-icon>mdi-logout</v-icon></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu :close-on-content-click="true">
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on">
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="()=>setLanguage(item.lang)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content v-if="init">
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "@/router";
export default {
  name: "App",
  data() {
    return {
      transitionName: "right-to-left",
      items: [
        { title: "Español", lang: "es" },
        { title: "English", lang: "en" }
      ]
    };
  },
  created() {
    this.session();
  },
  updated() {
    console.log('update app',this.init)
  },
  computed: {
    ...mapGetters(["getUser", "init"]),
    routers() {
      if (!this.getUser) return [];
      const result = routes.filter(r => r.meta.header);
      if (this.getUser && this.getUser.admin) return result
      return result.filter(r => !r.meta.admin);
    }
  },
  methods: {
    ...mapActions(["session", "setLanguage","logout"])
  },
  watch: {
    $route(to, from) {
      let toIndex = routes.findIndex(e => e.path === to.path);
      let fromIndex = routes.findIndex(e => e.path === from.path);
      this.transitionName =
        toIndex < fromIndex ? "left-to-right" : "right-to-left";
    }
  }
};
</script>

<style scoped>
.link {
  padding-left: 10px;
}
.link a {
  padding-right: 10px;
  text-decoration: none;
  color: white;
}
.isActive {
  color: blueviolet;
}
.left-to-right-enter-active,
.left-to-right-leave-active {
  transition: 0.2s ease-in;
}
.left-to-right-enter {
  opacity: 0;
  transform: translate(-400px, 0);
}
.left-to-right-leave-to /* .left-to-right-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(400px, 0);
}

.right-to-left-enter-active,
.right-to-left-leave-active {
  transition: 0.2s ease-in;
}
.right-to-left-enter {
  opacity: 0;
  transform: translate(400px, 0);
}
.right-to-left-leave-to /* .right-to-left-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-400px, 0);
}
</style>