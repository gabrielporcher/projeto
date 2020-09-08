<template>
  <div class="mx-8 my-5">
      <v-row>
          <v-col cols="12" lg="4" md="4" sm="4"></v-col>
            <v-col cols="12" lg="4" md="4" sm="4">
                <v-text-field type="text" label="Buscar" v-model="search"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="4"></v-col>
      </v-row>

        <v-row class="justify-space-between">        
              <div v-for="beer in filteredBeers" :key="beer.id">
                <BeerCardItem :beer="beer" />
                
              </div>  
            </v-row>
    
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl} from '@/global'
import BeerCardItem from '../beer/BeerCardItem'

export default {
    name: 'Search',
    components: {BeerCardItem},
    data: function(){
        return{
            search: '',
            beers: []
        }
    },
    computed: {
        filteredBeers() {
                return this.beers.filter(beer => beer.name.toLowerCase().includes(this.search)
                || beer.name.includes(this.search)
                || beer.name.toUpperCase().includes(this.search))
        }
    },
    methods: {
        
        getBeers(){
            const url = `${baseApiUrl}/beers/search`
            axios(url).then( res =>{
                this.beers = res.data
            })
    }
    },

    mounted(){
        this.getBeers()
    }
}
</script>

<style>
.bgb{
    background-color: blueviolet !important;
}
</style>