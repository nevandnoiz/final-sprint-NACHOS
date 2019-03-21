import MoviesService from '../services/MoviesService';

export default {
  state: {
    popularMovies: [],
    selectedMovie: null
  },
  getters: {
    moviesToDisplay(state) {
      return state.popularMovies
    },
    selectedMovie(state) {
      return state.selectedMovie
    }
  },
  mutations: {
    setPopularMovies(state, { movies }) {
      state.popularMovies = movies
    },
    setSelectedMovie(state, movie) {
      state.selectedMovie = movie
    }
  },
  actions: {
    async loadPopularMovies(context, payload) {
      const movies = await MoviesService.getPopularMovies()
      // console.log(movies)
      context.commit({ type: 'setPopularMovies', movies: movies.results })
    },
    async getMovieDetails(context, movieId) {
      const movieDetails = await MoviesService.getMovieDetails(movieId)
      return movieDetails
    },
    async getMovieImages(context, movieId) {
      const movieImages = await MoviesService.getMovieImages(movieId)
      return movieImages
    },
    async getMovieExternalIds(context, movieId) {
      const movieExternalIds = await MoviesService.getMovieExternalIds(movieId)
      return movieExternalIds
    },
    async getMoviesByKeyword(context, keyword) {
      const movies = await MoviesService.getMoviesByKeyword(keyword)
      return movies
    },
    async getMovieCredits(context, id) {
      const movieCredits = await MoviesService.getMovieCredits(id)
      return movieCredits
    }
  }
}