import TvShowsService from '../services/TvShowsService';

export default {
  state: {
    tvShows: '',
  },
  getters: {
    tvShowsToDisplay(state) {
      return state.tvShows
    },
  },
  mutations: {
    setTvShows(state, { tv }) {
      tv.forEach(item => item.type = 'tv');
      state.tvShows = tv
    },
  },
  actions: {
    async getTopRatedShows(context, payload) {
      const tv = await TvShowsService.getTopRatedShows()
      context.commit({ type: 'setTvShows', tv: tv })
    },
    async getPopularShows(context, payload) {
      const tv = await TvShowsService.getPopularShows()
      context.commit({ type: 'setTvShows', tv: tv })
    },
    async getTrendingShows(context, payload) {
      const tv = await TvShowsService.getTrendingShows()
      context.commit({ type: 'setTvShows', tv: tv })
    },
    async getTvShowDetails(context, tvId) {
      const tvDetails = await TvShowsService.getTvShowDetails(tvId)
      return tvDetails
    },
    async getTvShowImages(context, tvId) {
      const tvImages = await TvShowsService.getTvShowImages(tvId)
      return tvImages
    },
    async getTvShowExternalIds(context, tvId) {
      const tvExternalIds = await TvShowsService.getTvShowExternalIds(tvId)
      return tvExternalIds
    },
    async getTvShowByKeyword(context, keyword) {
      const tv = await TvShowsService.getTvShowByKeyword(keyword)
      return tv
    },
    async getTvShowCredits(context, id) {
      const tvCredits = await TvShowsService.getTvShowCredits(id)
      return tvCredits
    },
    async getTvShowReviews(context, id) {
      const tvCredits = await TvShowsService.getTvShowReviews(id)
      return tvCredits
    },
    async getTvShowVideos(context, id) {
      const tvShowVideos = await TvShowsService.getTvShowVideos(id)
      return tvShowVideos
    },
    async getTvShowWatchLinksByKeyword(context, keyword) {
      const links = await TvShowsService.getTvShowWatchLinksByKeyword(keyword)
      return links
    },
    async getSeasonDetails(context, { id, seasons }) {
      const seasonDetails = await TvShowsService.getSeasonDetails(id, seasons)
      return seasonDetails
    }
  }
}