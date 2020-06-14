<template>
  <div>
          <div>
            <v-form>
              <input type="hidden" v-model="user.id" />
              <v-row>
                <v-col lg="6" md="6" sm="12" xs="12">
                  <v-card-text>
                    <v-text-field
                      type="text"
                      label="Nome"
                      v-model="user.name"
                      :readonly="mode === 'remove'"
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                  <v-card-text>
                    <v-text-field
                      type="text"
                      label="E-mail"
                      v-model="user.email"
                      :readonly="mode === 'remove'"
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                  <v-card-text>
                    <v-text-field
                      type="password"
                      label="Senha"
                      v-model="user.password"
                      v-show="mode === 'save'"
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                  <v-card-text>
                    <v-text-field
                      type="password"
                      label="Confirme a senha"
                      v-model="user.confirmPassword"
                      v-show="mode === 'save'"
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row  class="justify-center">
              <v-radio-group v-model="selected" :mandatory="false" v-show="mode === 'save'">
                <v-col lg="6" md="6" sm="12" xs="12">
                <v-radio label="Administrador" value="3"></v-radio>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                <v-radio label="Cervejaria" value="2"></v-radio>
                </v-col>
              </v-radio-group>
              </v-row>

              <v-col class="text-center">
                <v-btn color="success" large v-if="mode === 'save'" @click="save">Salvar</v-btn>
                <v-btn color="error" large v-if="mode === 'remove'" @click="remove">Excluir</v-btn>
                <v-btn color="grey darken-2 ml-2" dark large @click="reset">Cancelar</v-btn>
              </v-col>
            </v-form>
          </div>
          <div class="mx-4">
            <br />
            <v-divider color="grey"></v-divider>
            <v-divider color="grey"></v-divider>
            <br />
          </div>

          <v-data-table :items="users" :headers="headers" items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn icon color="grey darken-2 ml-2" @click="loadUser(item, 'save')" class="mx-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="loadUser(item, 'remove')" class="mx-2">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
          </v-data-table>

  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "AdminUsers",
  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      selected: 1,
      headers: [
        { text: "Código", value: "id" },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Permissão", value: "userType" },
        { text: "Ações", value: "actions" }
      ]
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.user = {}), this.loadUsers(), this.selected =1;
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      this.user.userType = this.selected;
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(item, mode) {
      this.mode = mode;
      this.user = { ...item };
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>