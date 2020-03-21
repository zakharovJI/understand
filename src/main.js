import Vue from 'vue'
import App from './App/App.vue'
import router from './router'
import store from './store/store'
import Inputmask from "inputmask"

Vue.config.productionTip = false;
Vue.prototype.$inputmask = params => new Inputmask(params);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
