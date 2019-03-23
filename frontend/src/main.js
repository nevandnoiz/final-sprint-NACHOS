import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'
import store from './store' 
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './registerServiceWorker'
// add jquery globaly

// TODO Get it out from globaly
window.domcolor = null

Vue.use(Buefy)
Vue.use(Element)
// Vue.use(fac)
Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
