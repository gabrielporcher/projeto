<template>
  <v-navigation-drawer class="drawer-color" absolute v-show="drawer">
      <v-list>
        <router-link to="/">
        <v-list-item @click="toggleDrawer">
          <v-list-item-icon>
            <v-icon class="icon-drawer">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title text-drawer">
              Index
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>


        <v-menu open-on-hover offset-x>
            <template v-slot:activator="{on}">
              <v-list-item v-on="on">
                <v-list-item-icon>
                  <v-icon class="icon-drawer">mdi-beer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="title text-drawer">
                    Cervejas
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-card>
            <div class="column-wrap pa-5">
              
                <div v-for="style in styles" :key="style.id" @click="toggleDrawer">
                  <router-link class="item-text" :to="{ name: 'BeerByStyle', params: { id: style.id }}">{{style.name}}</router-link>
                </div>
                
                
             
            </div>
            </v-card>
        </v-menu>
        
        <router-link to="/admin">
        <v-list-item v-if="user.userType == 2 || user.userType == 3" @click="toggleDrawer">
          <v-list-item-icon>
            <v-icon class="icon-drawer">mdi-wrench</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title text-drawer">
              Gerenciar
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    name: "Drawer",
    data: function() {
      return {
        styles: [],
        beers: []
      }
    },
    computed: mapState(['user', 'drawer']),
    methods: {
        toggleDrawer(){
            this.$store.commit('toggleDrawer')
        },

        getStyles(){
            const url = `${baseApiUrl}/styles`
            axios.get(url).then(res => {
              this.styles = res.data
            })
        },
    },
    watch: {
      $route() {
        this.$store.dispatch(this.$route.params.id);
      }
    },
    mounted() {
      this.getStyles()
    }
}
</script>

<style>
a {
  text-decoration: none !important;
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

.text-drawer {
  color: #f8f9f9 !important;
}

.drawer-color {
  background-color: #aaada5 !important;
}

.item-text {
  
  text-decoration: none !important;
  color: #D1791C !important;
}

.column-wrap {
  width: 500px;
  max-height: 400px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

</style>