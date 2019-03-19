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
      const movies = await MoviesService.getPopularMovies()
      console.log(movies)
      context.commit({ type: 'setPopularMovies', movies:movies.results })
    },
    async getMovieDetails(context, movieId) {
      const movieDetails = await MoviesService.getMovieDetails(movieId)
      return movieDetails
    },
    async getMovieImages(context, movieId) {
      const movieImages = await MoviesService.getMovieImages(movieId)
      return movieImages
    }
  }
}