<template>
  <div class="mx-8 my-5">

            <v-row class="justify-space-between">        
              <div v-for="beer in beers" :key="beer.id">
                <BeerCardItem :beer="beer" />
              </div>  
            </v-row>   

  </div>

</template>

<script>
import BeerCardItem from '../beer/BeerCardItem'
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
  name: 'Index',
  components: {BeerCardItem},
  data: function() {
    return {
      beers: []
    }
  },
  methods: {
    getBeers(){
      const url = `${baseApiUrl}/beers`
      axios(url).then( res =>{
        this.beers = res.data
      })

    }
  },
  mounted() {
    this.getBeers()
  }
  
}
</script>

<style>

</style>