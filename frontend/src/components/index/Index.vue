<template>
  <div>
    <h1>INDEX</h1>

    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>userType</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.userType}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    
  </div>

</template>

<script>
import { baseApiUrl} from '@/global'
import axios from 'axios'

export default {
  name: 'Index',
  data: function() {
    return {
      users: []
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`
      axios.get(url).then( res=> {
        this.users = res.data
        console.log(this.users)
      })
    }
  },
  mounted() {
    this.loadUsers()
  }
}
</script>

<style>

</style>