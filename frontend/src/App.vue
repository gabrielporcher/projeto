<template>

  <v-app>

    
    <v-content>
      <Navbar :hideNavbar="!user"/>
      <Loading v-if="validatingToken" /> 

      <Content v-else />
      <Footer :hideFooter="!user" />
          
    </v-content>

  </v-app>
</template>

<script>
import Loading from '@/components/template/Loading'
import Navbar from '@/components/template/Navbar'
import axios from 'axios'
import {baseApiUrl, userKey} from '@/global'
import {mapState} from 'vuex'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'

export default {
  name: 'App',
  components: {Navbar, Content, Loading, Footer},
  computed: mapState(['user']),
  data: function() {
    return{
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null) //setUser null, it will be checked later.

      if(!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data){
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }
      this.validatingToken = false
    }
  },
  created() { //Created starts even before mounted
    this.validateToken()
  }

}
</script>

<style>

</style>
