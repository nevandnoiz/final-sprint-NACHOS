import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import MoviesModule from './modules/movies.js'
import TvModule from './modules/tv.js'
import ActorsModule from './modules/actors.js'
import UsersModule from './modules/users.js'
import ReviewsModule from './modules/reviews.js'
import TwitterModule from './modules/twitter.js'

Vue.use(Vuex)

const BASE_URL = (process.env.NODE_ENV !== 'development')
? '/'
: '//localhost:3003';

export default new Vuex.Store({
  modules: {
    TwitterModule,
    MoviesModule,
    TvModule,
    ActorsModule,
    UsersModule,
    ReviewsModule
  },
  state: {
    selectedItem: '',
    trending: ''
  },
  getters: {
    selectedItem(state) {
      return state.selectedItem
    },
    trendingToDisplay(state) {
      return state.trending
    },
  },
  mutations: {
    setSelectedItem(state, item) {
      state.selectedItem = item
    },
    setTrending(state,{trending}) {
      state.trending = trending
    },
  },
  actions: {
    async loadTrendingAll(context, payload) {
      let res = await axios.get(`${BASE_URL}/all`)
      const trending = res.data.results
      context.commit({ type: 'setTrending', trending })
    },
  }
})
