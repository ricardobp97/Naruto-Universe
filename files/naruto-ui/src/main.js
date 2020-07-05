import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://api.naruto-prc2020.com/api'
axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

if (process.env.NODE_ENV === 'production') {
  // Disable devtools
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
}

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
