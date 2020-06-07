<template>

   <nav v-if="!hideNavbar">
     <v-app-bar dense app>
       <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
       <v-toolbar-title class="text-uppercase grey--text">
         <span class="font-weight-light">Leeeerooy</span>
         <span>Jenkins</span>
         </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{on}">
          <v-btn icon v-on="on" color="grey" dark><v-icon>mdi-menu-down</v-icon></v-btn>
          </template>
          
          <v-list>
            <v-list-item>
              <router-link class="teste" to="/about">Config</router-link>
            </v-list-item>
            <v-list-item>
              <a class="teste" href @click.prevent="logout"> Sair </a>
            </v-list-item>
          </v-list>

        </v-menu>

     </v-app-bar>

      <v-navigation-drawer class="indigo" absolute v-model="drawer">
        <p>teste 1</p>
        <router-link to="/">Index</router-link>
        <router-link to="/admin">Admin</router-link>
      </v-navigation-drawer>

   </nav>

</template>



<script>
import {userKey} from '@/global'

export default {
    name: 'Navbar',
    props: {
      hideNavbar: Boolean
    },
    data: function(){
      return{
        drawer: false,
      }
    },
    methods: {
      logout() {
        localStorage.removeItem(userKey)
        this.$store.commit('setUser', null)
        this.$router.push({ name: 'auth' })
      }
    }

}
</script>

<style>
  .teste{
    text-decoration: none !important;
    color: #000 !important;
    padding: 10px;
    text-align: center !important;
  }

  .teste a{
    text-decoration: none !important;
    color: #000 !important;
    padding: 10px;
    text-align: center !important;
  }


</style>