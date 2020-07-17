<template>
  <v-card
    class="mx-auto my-3"
    max-width="344"
    outlined
    elevation="4"
  >
  <div class="no-decoration">
  <router-link :to="{name:'BeerPage', params: {id: beer.id}}">
    <v-list-item three-line>
      <v-list-item-content>
        <p class="category-color overline">Categoria</p>
        <v-list-item-title class="headline mb-1">{{beer.name}}</v-list-item-title>
        <v-list-item-subtitle>{{beer.subtitle}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="120"
        color="grey"
      >
      <img v-if="beer.imageUrl != null" :src="beer.imageUrl">
      </v-list-item-avatar>
    </v-list-item>

   </router-link>
   </div>
  </v-card>
</template>

<script>
export default {
    name: 'BeerCardItem',
    props: ['beer']
}
</script>

<style>
    .category-color{
        color: #D1791C !important
    }

    .no-decoration a{
      text-decoration: none !important;
    }
</style>