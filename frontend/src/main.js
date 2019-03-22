import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'
import store from './store' 
import './registerServiceWorker'
// add jquery globaly

window.$ = window.jQuery = require('jquery');
Vue.use(Element)
// Vue.use(fac)
Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
