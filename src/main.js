import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Notifications);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
