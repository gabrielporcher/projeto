<template>
  <div class="mx-8 my-8">
      <div class="align-self-center">
          <v-card class="mx-auto pa-5" elevation="5">
              <v-row>
                  <v-col md="6" class="">
                      <v-row class="mb-5">
                         <v-icon color="orange accent-4" large>mdi-fire</v-icon>
                      <h1 class="laranja">Finder</h1> 
                      </v-row>
                                           
                      <p>Ferramenta para selecionar a bebida ideal para o seu gosto.</p>
                          
                      <p>
                          No menu ao lado, defina o que você mais aprecia em uma cerveja,<br>
                          e o recomendaremos uma bebida especial.
                      </p>
                  </v-col>
                  <v-col md="6" class="">
                      <v-subheader class="g2 font-weight-bold">Sabor</v-subheader>
                        <v-slider color="orange accent-4" track-color="grey" v-model="sabor" max="70">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Coloração</v-subheader>
                        <v-slider color="orange accent-4" track-color="grey" v-model="cor" max="40">
                        </v-slider>

                        <v-subheader class="g2 font-weight-bold">Teor Alcoólico</v-subheader>
                        <v-slider color="orange accent-4" track-color="grey" v-model="teor" max="13">
                        </v-slider>

                        <div class="text-center my-5">
                            <v-btn color="success" large @click="findOne">Salvar</v-btn>
                        </div>
                  </v-col>
              </v-row>
          </v-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    name: 'BeerFinder',
    data: function() {
        return {
            sabor: 0,
            cor: 0,
            teor: 0,
            beers: []
        }
    },
    methods: {
        getBeers() {
            const url = `${baseApiUrl}/beers/change`
            axios(url).then( res => {
                this.beers = res.data
            })
        },

        findOne(){
            var counts = this.beers

            console.log(this.sabor, this.cor, this.teor)
            console.log(this.beers)
            console.log(counts)
        }
    },
    mounted() {
        this.getBeers()
    }
}
</script>

<style>
.g2{
    font-size: 1.25rem !important;
    line-height: 0.1rem;
}

.laranja{
    color: #FF6D00;
}
</style>