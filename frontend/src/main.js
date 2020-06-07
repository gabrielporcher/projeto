import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import './config/msg'
import './config/axios'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
