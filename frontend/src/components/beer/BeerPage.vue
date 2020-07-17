<template>
  <div class="mx-8 my-8">
      <v-row>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-card elevation="4" min-height="600">
                  <div class="pa-5">
                      <p class="g1 font-weight-bold mt-2">{{beer.name}}</p>
                      <p class="category-color overline">Categoria</p>
                      {{beer.description}}
                  </div>
              </v-card>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <div class="text-center">
                  <v-list-item-avatar size="600" >
                      <img v-if="beer.imageUrl != null" :src="beer.imageUrl">
                  </v-list-item-avatar>
              </div>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-card elevation="4" min-height="600">
                    <div class="pa-5">
                        <v-subheader class="g2 font-weight-bold">Sabor</v-subheader>
                        <v-slider color="orange accent-4" label="amargo" inverse-label track-color="grey" v-model="beer.ibu" readonly max="70">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Coloração</v-subheader>
                        <v-slider color="orange accent-4" label="escura" inverse-label track-color="grey" v-model="beer.srm" readonly max="40">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Teor Alcoólico</v-subheader>
                        <v-slider color="orange accent-4" label="forte" inverse-label track-color="grey" v-model="beer.alcohol" readonly max="15">
                        </v-slider>
                        
                        <p class="g2 font-weight-bold">Aparência:</p>
                        <p>{{beer.appearanceId}}</p>

                        <p class="g2 font-weight-bold">Aroma:</p>
                        <p>{{beer.smellId}}</p>

                        <p class="g2 font-weight-bold" v-if="beer.compositionId">Composição:</p>
                        <p v-if="beer.compositionId">{{beer.compositionId}}</p>
                    </div>
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

.g2{
    font-size: 1.25rem !important;
}
</style>