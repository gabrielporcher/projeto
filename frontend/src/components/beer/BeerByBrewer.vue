<template>
  <div class="mx-8 my-5">
    <v-row class="justify-space-around">        
        <div v-for="beer in beers" :key="beer.id">
            <BeerCardItem :beer="beer" />
        </div>  
    </v-row>   
    <div class="text-center my-5">
        <v-btn large dark outlined color="orange darken-1" v-if="loadMore" @click="getBeers">Carregar mais</v-btn>
    </div> 
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
            beers: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getBeers() {
            const url = `${baseApiUrl}/beers/brewer/${this.$route.params.id}?page=${this.page}`
            axios.get(url).then(res => {
                this.beers = this.beers.concat(res.data)
                this.page++

                if (res.data.length == 0) this.loadMore = false
            })
        }
    },
    mounted() {
        this.getBeers()
    },
    watch: {
        $route() {
            this.beers = []
            this.page = 1
            this.loadMore = true
            this.getBeers()
        }
    }
}
</script>

<style>
.btn-category-color{
        background-color: #D1791C !important;  
    }
</style>