<template>
  <v-container>
    <v-card elevation="4" class="my-5 pa-5">
      <h1>Meu dados</h1>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <input type="hidden" v-model="user.id" />
        <v-col cols="12" md="6" lg="6" sm="12" xs="12">
          <v-card-text>
            <v-text-field type="text" label="Nome" v-model="user.name" required>

            </v-text-field>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="6" lg="6" sm="12" xs="12">
          <v-card-text>
            <v-text-field type="text" label="Email" v-model="user.email" required>

            </v-text-field>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="6" lg="6" sm="12" xs="12">
          <v-card-text>
            <v-text-field type="password" label="Senha" v-model="usuario.password" required>

            </v-text-field>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="6" lg="6" sm="12" xs="12">
          <v-card-text>
            <v-text-field type="password" label="Confirme a senha" v-model="usuario.confirmPassword" required>

            </v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
      <v-col class="text-center">
        <v-btn color="success" large  @click="change">Salvar</v-btn>
        <v-btn color="grey darken-2 ml-2" dark large  @click="reset">Cancelar</v-btn>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import { baseApiUrl, showError} from '@/global'
import axios from 'axios'
import { mapState } from "vuex";

export default {
  name: "User",
  computed: mapState(["user"]),
  data: function(){
      return{
          usuario: {}
      }
  },
  methods: {
      change() {
          const id = this.user.id
          this.usuario.id = this.user.id
          this.usuario.name = this.user.name
          this.usuario.email = this.user.email
          console.log(this.usuario)
            axios.put(`${baseApiUrl}/user/${id}`, this.usuario)
                .then(() =>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.$router.push({ name: 'index' })
                })
                .catch(showError)
      },
      reset(){
        this.user = {}
        this.usuario = {}
      }
  }
};
</script>

<style>
.teste {
  background-color: blueviolet !important;
}
</style>