import MoviesService from '../services/MoviesService';

export default {
  state: {
    movies: '',
  },
  getters: {
    moviesToDisplay(state) {
      return state.movies
    },
  },
  mutations: {
    setMovies(state, { movies }) {
      movies.forEach( movie => movie.type = 'movie');
      state.movies = movies
    },
  },
  actions: {
    async getTopRatedMovies(context, payload) {
      const movies = await MoviesService.getTopRatedMovies()
      context.commit({ type: 'setMovies', movies: movies })
    },
    async getPopularMovies(context, payload) {
      const movies = await MoviesService.getPopularMovies()
      context.commit({ type: 'setMovies', movies: movies })
    },
    async getTrendingMovies(context, payload) {
      const movies = await MoviesService.getTrendingMovies()
      context.commit({ type: 'setMovies', movies: movies })
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
    },
    async getMovieCredits(context, id) {
      const movieCredits = await MoviesService.getMovieCredits(id)
      return movieCredits
    },
    async getMovieVideos(context, id) {
      const movieVideos = await MoviesService.getMovieVideos(id)
      return movieVideos
    }
  }
}