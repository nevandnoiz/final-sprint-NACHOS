import Vue from 'vue'
import Vuex from 'vuex'
import MoviesModule from './modules/movies.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MoviesModule
  },
  state: {

  },
  getters: {
    imgURL(imgId){
      return `http://image.tmdb.org/t/p/w185/${imgId}`
    }
  },
  mutations: {

  },
  actions: {

  }
})
