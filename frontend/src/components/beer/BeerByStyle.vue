<template>
  <div class="mx-8 my-5">

            <v-row class="justify-space-around">        
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
  name: 'BeerByStyle',
  components: {BeerCardItem},
  data: function() {
    return {
      beers: []
    }
  },
  methods: {
    getBeers(){
      const url = `${baseApiUrl}/beers/style/${this.$route.params.id}`
      axios(url).then( res =>{
          console.log(res.data)
        this.beers =this.beers.concat(res.data)
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