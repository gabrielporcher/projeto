<template>
  <div>
      <div>
          <v-form>
              <input type="hidden" v-model="smell.id"  />
              <v-row class="justify-center">
                <v-col lg="6" md="6" sm="12" xs="12">
                  <v-card-text>
                    <v-text-field
                      type="text"
                      label="Nome" 
                      v-model="smell.name" 
                      :readonly="mode === 'remove'"                    
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-col>
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

        <v-data-table :items="smells" :headers="headers" items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn icon color="grey darken-2 ml-2" @click="loadSmell(item, 'save')" class="mx-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="loadSmell(item, 'remove')" class="mx-2">
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
    Name: "AdminSmell",
    data: function() {
        return{
            mode: "save",
            smell: {},
            smells: [],
            headers: [
                { text: "Código", value: "id" },
                { text: "Nome", value: "name" },
                { text: "Ações", value: "actions" }
            ]
        }
    },
    methods: {
        loadSmells() {
            const url = `${baseApiUrl}/smells`
            axios.get(url).then(res => {
                this.smells = res.data
            })
        },
        reset() {
            this.mode = "save",
            this.smell = {},
            this.loadSmells()
        },
        save(){
            const method = this.smell.id ? "put" : "post"
            const id = this.smell.id ? `/${this.smell.id}` : ""
            axios[method](`${baseApiUrl}/smells${id}`, this.smell)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset()
                })
                .catch(showError)
        },
        remove(){
            const id = this.smell.id
            axios.delete(`${baseApiUrl}/smells/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadSmell(item, mode){
            this.mode = mode
            this.smell = {...item}
        }
    },
    mounted() {
        this.loadSmells()
    }
}
</script>

<style>

</style>