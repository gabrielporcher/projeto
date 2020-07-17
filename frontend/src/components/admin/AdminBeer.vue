<template>
  <div>
    <div>
        <v-form>
            <input type="hidden" v-model="beer.id" />
            <v-row>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Nome" v-model="beer.name" required :readonly="mode === 'remove'"></v-text-field>
                      </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Subtítulo" v-model="beer.subtitle" hint="Uma única frase ex: A cerveja que desce redondo" persistent-hint required :readonly="mode === 'remove'"></v-text-field>
                      </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-card-text>
                        <v-select :items="styles" label="Estilo" required v-model="beer.styleId" v-show="mode === 'save'"></v-select>
                    </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Srm" v-model="beer.srm" required v-show="mode === 'save'"></v-text-field>
                      </v-card-text>
                </v-col>

                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-card-text>
                        <v-select :items="appearances" label="Aparência" required v-model="beer.appearanceId" v-show="mode === 'save'"></v-select>
                    </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Ibu" v-model="beer.ibu" required v-show="mode === 'save'"></v-text-field>
                      </v-card-text>
                </v-col>

                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-card-text>
                        <v-select :items="compositions" label="Composição" required v-model="beer.compositionId" v-show="mode === 'save'"></v-select>
                    </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Teor alcoólico" hint="Não precisa ser um número inteiro" persistent-hint v-model="beer.alcohol" required v-show="mode === 'save'"></v-text-field>
                      </v-card-text>
                </v-col>

                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-card-text>
                        <v-select :items="smells" label="Arôma" required v-model="beer.smellId" v-show="mode === 'save'"></v-select>
                    </v-card-text>
                </v-col>
                <v-col lg="6" md="6" sm="12" xs="12">
                      <v-card-text>
                          <v-text-field type="text" label="Imagem (URL)" v-model="beer.imageUrl" counter="1000" required v-show="mode === 'save'"></v-text-field>
                      </v-card-text>
                </v-col>
            </v-row>

            <v-row class="justify-center">
                <v-col lg="6" md="6" sm="12" xs="12">
                    <v-textarea v-model="beer.description" background-color="grey lighten-3" counter="800" :readonly="mode === 'remove'">
                        <template v-slot:label>
                            <div>
                                Descrição
                            </div>
                        </template>
                    </v-textarea>
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

        <v-data-table v-if="user.userType == 3" :items="admBeers" :headers="headers" :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn icon color="grey darken-2 ml-2" @click="loadBeer(item, 'save')" class="mx-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="loadBeer(item, 'remove')" class="mx-2">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
        </v-data-table>

        <v-data-table v-else :items="beers" :headers="headers" :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn icon color="grey darken-2 ml-2" @click="loadBeer(item, 'save')" class="mx-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="loadBeer(item, 'remove')" class="mx-2">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
        </v-data-table>        

  </div>
</template>

<script>
import {mapState} from 'vuex'
import { baseApiUrl, showError } from "@/global"
import axios from "axios"

export default {
    name: 'AdminBeer',
    computed: mapState(['user']),
    data: function(){
        return {
            mode: 'save',
            beer: {},
            beers: [],
            admBeers: [],
            styles: [],
            smells: [],
            compositions: [],
            appearances: [],
            headers: [
                { text: "Código", value: "id" },
                { text: "Nome", value: "name" },
                { text: "Subtítulo", value: "subtitle" },
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

        loadAdmBeers() {
            const url = `${baseApiUrl}/beers`
            axios.get(url).then(res => {
                this.admBeers = res.data
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

        loadStyles() {
            const url = `${baseApiUrl}/styles`
            axios.get(url).then( res => {
                this.styles = res.data.map(style => {
                    return {value: style.id, text: `${style.name}`}
                })
            })
        },

        loadAppearances() {
            const url = `${baseApiUrl}/appearances`
            axios.get(url).then(res => {
                this.appearances = res.data.map(appearance => {
                    return {value: appearance.id, text: `${appearance.name}`}
                })
            })
        },

        loadCompositions(){
            const url = `${baseApiUrl}/compositions`
            axios.get(url).then(res => {
                this.compositions = res.data.map(composition => {
                    return {value: composition.id, text: `${composition.name}`}
                })
            })
        },

        reset(){
            this.mode = 'save'
            this.beer = {}
            this.loadBeers()
            this.loadAdmBeers()
        },

        save(){
            const method = this.beer.id ? 'put' : 'post'
            const id = this.beer.id ? `/${this.beer.id}` : ''
            const brewerId = this.beer.brewerId
            this.beer.id ? this.beer.brewerId = brewerId : this.beer.brewerId = this.user.id //Dont change brewerId if an Admin updates any beer
            
            axios[method](`${baseApiUrl}/beers${id}`, this.beer)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
                    
        },

        remove(){
            const id = this.beer.id
            axios.delete(`${baseApiUrl}/beers/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        loadBeer(item, mode){
            this.mode = mode
            this.beer = {...item}
        }
    },
    watch: {
        page(){
            this.loadBeers()
            this.loadAdmBeers()
        }
    },
    mounted() {
        this.loadSmells()
        this.loadStyles()
        this.loadAppearances()
        this.loadCompositions()
        this.loadBeers()
        this.loadAdmBeers()
    }
}
</script>

<style>

</style>