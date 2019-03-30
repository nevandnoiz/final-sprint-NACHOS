import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BrowseMovies from './views/BrowseMovies.vue'
import BrowseTvShows from './views/BrowseTvShows.vue'
import BrowseActors from './views/BrowseActors.vue'
import ItemDetails from './views/ItemDetails.vue'
import ActorDetails from './views/ActorDetails.vue'
import UserPage from './views/UserPage.vue'

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
      path: '/actors',
      name: 'actors',
      component: BrowseActors
    },
    {
      path: '/:itemType/details/:itemId',
      name: 'itemDetails',
      component: ItemDetails
    },
    {
      path: '/actors/:actorId',
      name: 'actorDetails',
      component: ActorDetails
    },
    {
      path: '/user/:userId',
      name: 'userPage',
      component: UserPage
    },
  ]
})
