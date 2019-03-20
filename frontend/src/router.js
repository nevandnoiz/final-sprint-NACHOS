import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BrowsePage from './views/BrowsePage.vue'
import DetailsPage from './views/DetailsPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/browse',
      name: 'browse',
      component: BrowsePage
    },
    {
      path: '/details/:movieId',
      name: 'details',
      component: DetailsPage
    },
  ]
})
