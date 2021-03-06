import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'
import store from './store' 
import Buefy from 'buefy'
import './registerServiceWorker'
// add jquery globaly
import VueMasonry from 'vue-masonry-css'
import VueCarousel from 'vue-carousel';
import Bootstrap from 'bootstrap'

import "@/assets/global.css"
export const eventBus = new Vue()
Vue.use(VueMasonry);
Vue.use(Buefy)
Vue.use(Element)
// Vue.use(fac)
// Vue.use(bootstrap)
Vue.use(VueCarousel);
Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
