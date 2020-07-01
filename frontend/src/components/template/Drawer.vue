<template>
  <v-navigation-drawer class="drawer-color" absolute v-show="drawer">
      <v-list>
        <v-list-item @click="toggleDrawer">
          <v-list-item-icon>
            <v-icon class="icon-drawer">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="/" class="drawer-text">Index</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.userType == 2 || user.userType == 3" @click="toggleDrawer">
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
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Drawer",
    computed: mapState(['user', 'drawer']),
    methods: {
        toggleDrawer(){
            this.$store.commit('toggleDrawer')
        }
    }
}
</script>

<style>

</style>