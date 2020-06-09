<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-center">
        <div class="my-10">
          <div class="text-center">
            <h1>Meus dados:</h1>
            <p>Nome: {{user.name}}</p>
            <p>Email: {{user.email}}</p>
          </div>

          <div class="text-center">
            <v-form>
                <input id="user-id" type="hidden" v-model="user.id" />
                <input id="user-email" type="hidden" v-model="user.email" />
              <v-card-text>
                <v-text-field type="text" label="Nome" v-model="user.name"></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field type="password" label="Senha" v-model="user.password"></v-text-field>
              </v-card-text>
              <v-card-text>
                  <v-text-field type="password" label="Senha" v-model="user.confirmPassword"></v-text-field>
              </v-card-text>
              <v-col class="text-center">
                <v-btn class="success" large @click="change">Alterar</v-btn>
              </v-col>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
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
          this.usuario = {
              id: this.user.id,
              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
              confirmPassword: this.user.confirmPassword
          }
            axios.put(`${baseApiUrl}/user/${id}`, this.usuario)
                .then(() =>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.$router.push({ name: 'index' })
                })
                .catch(showError)
      },
      reset(){
        this.usuario = {}
        this.user = {}
      }
  }
};
</script>

<style>
</style>