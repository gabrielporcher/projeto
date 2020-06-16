<template>
  <div>
    <div>
        <v-form>
            <input type="hidden" v-model="user.id" />
            <v-row>
                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-card-text>
                        <v-select :items="smells" label="Aroma" required v-model="beer.id"></v-select>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-btn color="success" large v-if="mode === 'save'" @click="save">Salvar</v-btn>
        </v-form>
    </div>

    <div class="mx-4">
        <br />
            <v-divider color="grey"></v-divider>
            <v-divider color="grey"></v-divider>
        <br />
    </div>

        <v-data-table :items="beers" :headers="headers" items-per-page="5">
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
import {mapState} from 'vuex'
import { baseApiUrl } from "@/global"
import axios from "axios"

export default {
    name: 'AdminBeer',
    computed: mapState(['user']),
    data: function(){
        return {
            mode: 'save',
            beer: {},
            beers: [],
            styles: [],
            smells: [],
            compositions: [],
            appearances: [],
            headers: [
                { text: "Código", value: "id" },
                { text: "Nome", value: "name" },
                { text: "Ações", value: "actions" }
            ]
        }
    },
    methods: {
        loadBeers(){
            const url = `${baseApiUrl}/brewer/beers`
            axios.get(url).then(res => {
                this.beers = res.data
            })
        },

        loadSmells() {
            const url = `${baseApiUrl}/smells`
            axios.get(url).then(res => {
                this.smells = res.data.map(smell => {
                    return {value: smell.id, text: `${smell.name}` }
                })
            })
        },
        save(){
            this.beer.brewerId = this.user.id
            console.log("Aroma: "+this.beer.id+ " Id do brewer: "+this.beer.brewerId)
        }
    },
    mounted() {
        this.loadSmells()
        this.loadBeers()
    }
}
</script>

<style>

</style>