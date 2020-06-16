<template>
  <div>
      <div>
          <v-form>
              <input type="hidden" v-model="composition.id" />
              <v-row class="justify-center">
                  <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Nome" v-model="composition.name" :readonly="mode === 'remove'" required></v-text-field>
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
          <br/>
      </div>

        <v-data-table :items="compositions" :headers="headers" :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn icon color="grey darken-2 ml-2" @click="loadComposition(item, 'save')" class="mx-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="loadComposition(item, 'remove')" class="mx-2">
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
    name: 'AdminComposition',
    data: function() {
        return{
            mode: 'save',
            composition: {},
            compositions: [],
            headers: [
                { text: "Código", value: "id" },
                { text: "Nome", value: "name" },
                { text: "Ações", value: "actions" }
            ]
        }
    },
    methods: {
        loadCompositions(){
            const url = `${baseApiUrl}/compositions`
            axios.get(url).then(res => {
                this.compositions = res.data
            })
        },
        reset(){
            this.composition= {},
            this.mode = 'save',
            this.loadCompositions()
        },
        loadComposition(item, mode){
            this.mode = mode,
            this.composition = {...item}
        },
        save(){
            const method = this.composition.id ? "put" : "post"
            const id = this.composition.id ? `/${this.composition.id}` : ""
            axios[method](`${baseApiUrl}/compositions${id}`, this.composition)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove(){
            const id = this.composition.id
            axios.delete(`${baseApiUrl}/compositions/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadCompositions()
    }
}
</script>

<style>

</style>