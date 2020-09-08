<template>
  <v-footer dark absolute color="grey darken-2" v-if="!hideFooter">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        hideFooter: Boolean
    }
}
</script>

<style>

</style>