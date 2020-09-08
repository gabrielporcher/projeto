<template>
  <div class="mx-8 my-8">
    <v-card elevation="5" class="mb-10">
      <v-tabs fixed-tabs background-color="grey" color="black">
        <v-tab>Cerveja</v-tab>
        <v-tab>Composição</v-tab>
        <v-tab>Aroma</v-tab>
        <v-tab v-if="user.userType == 3">Usuários</v-tab>
        <v-tab-item>
          <AdminBeer />
        </v-tab-item>
        <v-tab-item>
          <AdminComposition />
        </v-tab-item>
        <v-tab-item>
          <AdminSmell />
        </v-tab-item>
        <v-tab-item  >
          <AdminUsers />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import AdminUsers from "./AdminUsers"
import AdminSmell from "./AdminSmell"
import AdminComposition from "./AdminComposition"
import AdminBeer from "./AdminBeer"
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: mapState(["user"]),
  components: {AdminUsers, AdminSmell, AdminComposition, AdminBeer}
}
</script>

<style>

</style>