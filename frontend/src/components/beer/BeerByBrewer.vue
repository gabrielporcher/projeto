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
import BeerCardItem from './BeerCardItem'
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    name: 'BeerByBrewer',
    components: {BeerCardItem},
    data: function(){
        return{
            beers: []
        }
    },
    methods: {
        getBeers() {
            const url = `${baseApiUrl}/beers/brewer/${this.$route.params.id}`
            axios.get(url).then(res => {
                this.beers = res.data
            })
        }
    },
    mounted() {
        this.getBeers()
    },
    watch: {
        $route() {
            this.beers = []
            this.getBeers()

        }
    }
}
</script>

<style>

</style>