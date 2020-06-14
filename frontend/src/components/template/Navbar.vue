<template>
  <nav v-if="!hideNavbar">
    <v-app-bar dark dense app class="grey darken-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Brew</span>
        <span>erly</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on" dark>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <div class="dropdown-content">
          <router-link class="dropdown-text" to="/user">Editar</router-link>

          <a class="dropdown-text" href @click.prevent="logout">Sair</a>
        </div>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer class="drawer-color" absolute v-model="drawer">
      <v-list>
        <v-list-item @click="drawer = !drawer">
          <v-list-item-icon>
            <v-icon class="icon-drawer">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="/" class="drawer-text">Index</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.userType == 2 || user.userType == 3" @click="drawer = !drawer">
          <v-list-item-icon>
            <v-icon class="icon-drawer">mdi-wrench</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="/admin" class="drawer-text">Gerenciar</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>



<script>
import { userKey } from "@/global";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: mapState(["user"]),
  props: {
    hideNavbar: Boolean
  },
  data: function() {
    return {
      drawer: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    }
  }
};
</script>

<style>
.drawer-text {
  text-decoration: none !important;
  color: #f8f9f9 !important;
  text-align: center !important;
  margin-top: 10px;
}

.drawer-text a {
  text-decoration: none !important;
  color: #f8f9f9 !important;
  text-align: center !important;
}

.dropdown-text {
  text-decoration: none !important;
  color: #211a19 !important;
  text-align: center !important;
  margin-top: 10px;
}

.dropdown-text a {
  text-decoration: none !important;
  color: #211a19 !important;
  text-align: center !important;
}

.icon-drawer {
  color: #f8f9f9 !important;
}

.drawer-color {
  background-color: #aaada5 !important;
}

.dropdown-content {
  right: 0px;
  min-width: 170px;
  padding: 10px;
  z-index: 100;
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>