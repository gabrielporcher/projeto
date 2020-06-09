<template>
  <div class="bg-orange">
    <v-container d-flex justify-center>
      <div class="align-self-center">
        <v-card class="mx-auto" color="white" height="80vh" width="80vw">
          <v-row>
            <v-col md="5" class="pa-0 hide-div">
              <v-img :src="require('@/assets/botle.jpg')" position="center top" height="80vh"></v-img>
            </v-col>

            <v-col md="7" class="align-self-center m-only-div">
              <div class="mx-5">
                <v-tabs fixed-tabs background-color="grey" color="black">
                  <v-tab>Login</v-tab>
                  <v-tab>Registro</v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-form>
                        <v-card-text>
                          <v-text-field type="text" label="E-mail" v-model="user.email"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field type="password" label="Senha" v-model="user.password"></v-text-field>
                        </v-card-text>
                        <v-col class="text-center">
                          <v-btn class="success" large @click="signin">Entrar</v-btn>
                        </v-col>
                      </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-form>
                        <v-card-text>
                          <v-text-field type="text" label="Nome" v-model="user.name"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field type="text" label="E-mail" v-model="user.email"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field type="password" label="Senha" v-model="user.password"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            type="password"
                            label="Confirme a senha"
                            v-model="user.confirmPassword"
                          ></v-text-field>
                        </v-card-text>
                        <v-col class="text-center">
                          <v-btn class="success" large @click="signup">Registrar</v-btn>
                        </v-col>
                      </v-form>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "auth",
  data: function() {
    return {
      user: {} //User from backend
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data)); //Keep user loged in even after close tab
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.container {
  height: 100vh;
}

.align-self-center {
  width: 100%;
}

.bg-orange {
  background-color: #efc070;
}

.m-only-div {
  padding: 0 5vw;
}

@media (max-width: 962px) {
  .hide-div {
    display: none;
  }

  .m-only-div {
    margin-top: 8vh;
  }
}
</style>
