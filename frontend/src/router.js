import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BrowseMovies from './views/BrowseMovies.vue'
import BrowseTvShows from './views/BrowseTvShows.vue'
import DetailsPage from './views/DetailsPage.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/movies',
      name: 'movies',
      component: BrowseMovies
    },
    {
      path: '/tv',
      name: 'tv',
      component: BrowseTvShows
    },
    {
      path: '/details/:movieId',
      name: 'details',
      component: DetailsPage
    },
  ]
})
