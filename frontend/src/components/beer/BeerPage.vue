<template>
  <div class="mx-8 my-8">
      <v-row>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-card elevation="4" min-height="600" class="pa-5">
                      <p class="g1 font-weight-bold mt-2">{{beer.name}}</p>
                      <router-link :to="{ name: 'BeerByStyle', params: { id: beer.styleId }}"><p class="category-color overline">{{beer.style}}</p></router-link>
                      
                      {{beer.description}}
              </v-card>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-sheet class="d-flex justify-center" height="600">
                  <img class="bgb" v-if="beer.imageUrl != null" :src="beer.imageUrl">
              </v-sheet>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <v-card class="pa-5" elevation="4" min-height="600">
                    
                        <v-subheader class="g2 font-weight-bold">Sabor</v-subheader>
                        <v-slider color="orange accent-4" label="amargo" inverse-label track-color="grey" v-model="beer.ibu" readonly max="70">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Coloração</v-subheader>
                        <v-slider color="orange accent-4" label="escura" inverse-label track-color="grey" v-model="beer.srm" readonly max="40">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Teor Alcoólico</v-subheader>
                        <v-slider color="orange accent-4" label="forte" inverse-label track-color="grey" v-model="beer.alcohol" readonly max="15">
                        </v-slider>
                        
                            <br>
                            <v-row>
                            <v-col cols="12" lg="6" md="6">
                                <v-card class="d-flex" flat>
                                    <v-divider class="orange ml-2" vertical inset>
                                    </v-divider>
                                    <v-divider class="orange mr-2" vertical inset>
                                    </v-divider>
                                    <v-card flat>
                                        <br>
                                        <p class="color-light">Aparência:</p>
                                        <p class="g2 font-weight-bold">{{beer.appearance}}</p>
                                    </v-card> 
                                </v-card>
                            </v-col>

                            <v-col cols="12" lg="6" md="6">
                                <v-card class="d-flex " flat>
                                    <v-divider class="orange ml-2" vertical inset>
                                    </v-divider>
                                    <v-divider class="orange mr-2" vertical inset>
                                    </v-divider>
                                    <v-card flat>
                                        <br>
                                        <p class="color-light">Aroma:</p>
                                        <p class="g2 font-weight-bold">{{beer.smell}}</p>
                                    </v-card> 
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" lg="6" md="6">
                                <v-card class="d-flex" flat>
                                    <v-divider class="orange ml-2" vertical inset>
                                    </v-divider>
                                    <v-divider class="orange mr-2" vertical inset>
                                    </v-divider>
                                    <v-card flat v-if="beer.compositionId">
                                        <br>
                                        <p class="color-light">Composição:</p>
                                        <p class="g2 font-weight-bold">{{beer.composition}}</p>
                                    </v-card> 
                                </v-card>
                            </v-col>
                            <v-col cols="12" lg="6" md="6">
                                <v-card class="d-flex" flat>
                                    <v-divider class="black ml-2" vertical inset>
                                    </v-divider>
                                    <v-divider class="black mr-2" vertical inset>
                                    </v-divider>
                                    <v-card flat>
                                        <br>
                                        <p class="color-light">Fabricante:</p>
                                        <p class="g2 font-weight-bold category-color"><router-link class="category-color" :to="{ name: 'BeerByBrewer', params: { id: beer.brewerId }}">{{beer.users}}</router-link></p>
                                    </v-card> 
                                </v-card>
                            </v-col>
                        </v-row>
           
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
        axios.get(url).then(res => {
            this.beer = res.data
        })
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
    line-height: 0.1rem;
}

.color-light {
    color: #9E9E9E !important;
    font-weight: bold;
    line-height: 0.2rem;
}

.bgb {
    width: 100%;
    height: auto;
    object-fit: cover;
}

</style>