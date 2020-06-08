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
          
          <div class="dropdown-content">
              <router-link class="teste" to="/user">Editar</router-link>

              <a class="teste" href @click.prevent="logout"> Sair </a>
          </div>

        </v-menu>

     </v-app-bar>

      <v-navigation-drawer class="indigo" absolute v-model="drawer">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="title"><router-link to="/admin" class="teste">Gerenciar</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

   </nav>

</template>



<script>
import {userKey} from '@/global'
import {mapState} from 'vuex'

export default {
    name: 'Navbar',
    computed: mapState(['user']),
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
    text-align: center !important;
    margin-top: 10px;
  }

  .teste a{
    text-decoration: none !important;
    color: #000 !important;
    text-align: center !important;
  }

.dropdown-content{
  right: 0px;
  min-width: 170px;
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

}


</style>