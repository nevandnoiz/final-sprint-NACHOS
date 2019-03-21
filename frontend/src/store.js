import Vue from 'vue'
import Vuex from 'vuex'
import MoviesModule from './modules/movies.js'
import TvModule from './modules/tv.js'
import UsersModule from './modules/users.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MoviesModule,
    TvModule,
    UsersModule
  },
  state: {

  },
  getters: {

  },
  mutations: {
    
  },
  actions: {

  }
})
