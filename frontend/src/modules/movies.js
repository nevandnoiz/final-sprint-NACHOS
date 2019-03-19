import MoviesService from '../services/MoviesService';

export default {
  state: {
    popularMovies: []
  },
  getters: {
    moviesToDisplay: state => state.popularMovies
  },
  mutations: {
    setPopularMovies(state, { movies }) {
      state.popularMovies = movies
    }
  },
  actions: {
    async loadPopularMovies(context, payload) {
      const movies = await MoviesService.getDetailsById()
      context.commit({ type: 'setPopularMovies', movies:movies.results })
    },
    async getDetailsById(context, movieId) {
      const movieDetails = await MoviesService.getDetailsById(movieId)
      return movieDetails
    }
  }
}