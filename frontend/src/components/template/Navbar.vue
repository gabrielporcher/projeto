<template>
  <nav v-if="!hideNavbar">
    <v-app-bar dark dense app class="grey darken-2">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <div class="no-decoration">
          <router-link to="/">
        <span class="font-weight-light">Brew</span>
        <span>erly</span>
        </router-link>
        </div>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <router-link to="/search">
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      </router-link>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on" dark>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
          {{user.name}}
        </template>
        <v-card>
          <div class="dropdown-content">
            <router-link class="dropdown-text" to="/user">Editar</router-link>
            <a class="dropdown-text" href @click.prevent="logout">Sair</a>
          </div>
        </v-card>

      </v-menu>
    </v-app-bar>
    

    <Drawer/>
  </nav>
</template>



<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Drawer from './Drawer'

export default {
  name: "Navbar",
  computed: mapState(["user"]),
  components: {Drawer},
  props: {
    hideNavbar: Boolean
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },

    toggleDrawer(){
      this.$store.commit('toggleDrawer')
    }
  }
};
</script>

<style>
.no-decoration a{
      text-decoration: none !important;
      color: #9E9E9E !important
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
</style>