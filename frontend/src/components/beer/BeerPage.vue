<template>
  <div class="mx-2">
      <v-row>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-card class="my-5" elevation="4">
                  <div class="pa-5">
                      <p class="g1 font-weight-bold mt-2">{{beer.name}}</p>
                      <p class="category-color overline">Categoria</p>
                      {{beer.description}}
                  </div>
              </v-card>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <div class="my-5 gbn">
                  <v-list-item-avatar size="500" rounded >
                      <img v-if="beer.imageUrl != null" :src="beer.imageUrl">
                  </v-list-item-avatar>
              </div>
          </v-col>
          <v-col cols="12" lg="4" md="6" sm="12" xs="12">
              <v-card class="my-5" elevation="4">
                  <v-slider color="yellow" v-model="beer.alcohol" readonly max="15">
                  </v-slider>
                  alcool: {{beer.alcohol}}
              </v-card>
          </v-col>

      </v-row>
  </div>
</template>

<script>
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: "BeerPage",
    data: function() {
        return {
            beer: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/beers/${this.$route.params.id}`
        axios.get(url).then(res => this.beer = res.data)
    }
}
</script>

<style>

.category-color{
        color: #D1791C !important;
        
    }

.g1{
    font-size: 2rem !important;
}

.gbn{
    background-color: indigo !important;
}
</style>