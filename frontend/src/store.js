import Vue from 'vue'
import Vuex from 'vuex'
import MoviesModule from './modules/movies.js'
import UsersModule from './modules/users.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MoviesModule,
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
