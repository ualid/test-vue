import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Api from './api'

Vue.config.productionTip = false
Api.init()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
