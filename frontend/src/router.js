import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BrowseMovies from './views/BrowseMovies.vue'
import BrowseTvShows from './views/BrowseTvShows.vue'
import BrowseActors from './views/BrowseActors.vue'
import MovieDetails from './views/MovieDetails.vue'
import TvShowDetails from './views/TvShowDetails.vue'
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
      path: '/movies/details/:movieId',
      name: 'movieDetails',
      component: MovieDetails
    },
    {
      path: '/tv/details/:tvShowId',
      name: 'tvShowDetails',
      component: TvShowDetails
    },
    {
      path: '/tv/details/:actorId',
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
