<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-center">
        <div class="my-10">
          <v-form>
            <v-card-text>
              <v-text-field type="text" label="Nome" v-model="user.name" required></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field type="text" label="E-mail" v-model="user.email" required></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field type="password" label="Senha" v-model="user.password" required></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field type="password" label="Confirme a senha" v-model="user.confirmPassword" required></v-text-field>
            </v-card-text>


            <v-col class="text-center">
              <v-btn class="success" large @click="save">Cadastrar</v-btn>
            </v-col>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Admin",
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    save() {
      axios.post(`${baseApiUrl}/users`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    }
  }
};
</script>

<style>
</style>