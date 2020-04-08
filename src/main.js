import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import VueCurrencyInput from 'vue-currency-input';
import axios from 'axios';




import VSelectize from '@isneezy/vue-selectize';
Vue.component('v-selectize', VSelectize);


Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.use(VueCurrencyInput, {
  globalOptions: {
    currency: null,
    distractionFree: false,
    locale: 'de-DE'
  }
});


axios.defaults.baseURL = store.getters.API;
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}


Array.prototype.remove = function(value) {
  var idx = this.indexOf(value);
  if (idx != -1) {
    // Второй параметр - число элементов, которые необходимо удалить
    return this.splice(idx, 1);
  }
  return false;
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
