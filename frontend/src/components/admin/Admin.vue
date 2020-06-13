<template>
  <div class="mx-8 my-8">
    <v-card elevation="5">
      <v-tabs fixed-tabs background-color="grey" color="black">
        <v-tab>Cerveja</v-tab>
        <v-tab>Composição</v-tab>
        <v-tab>Aroma</v-tab>
        <v-tab v-if="user.userType == 3">Users</v-tab>
        <v-tab-item>Ainda nada</v-tab-item>
        <v-tab-item>Tambem nada</v-tab-item>
        <v-tab-item>Nope</v-tab-item>
        <v-tab-item  >
          <AdminUsers />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import AdminUsers from "./AdminUsers"
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: mapState(["user"]),
  components: {AdminUsers}
}
</script>

<style>
</style>