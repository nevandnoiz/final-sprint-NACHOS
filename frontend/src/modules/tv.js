import TvService from '../services/TvService';

export default {
  state: {
    popularTv: '',
    selectedTv: null
  },
  getters: {
    showsToDisplay(state) {
      return state.popularTv
    },
    selectedTv(state) {
      return state.selectedTv
    }
  },
  mutations: {
    setPopularTv(state, { tv }) {
      state.popularTv = tv
    },
    setSelectedTv(state, tv) {
      state.selectedTv = tv
    }
  },
  actions: {
    async loadPopularTv(context, payload) {
      const tv = await TvService.getPopularShows()
      console.log('kaka')
      context.commit({ type: 'setPopularTv', tv: tv.results })
    },
    async getTvDetails(context, tvId) {
      const tvDetails = await TvService.getTvDetails(tvId)
      return tvDetails
    },
    async getTvImages(context, tvId) {
      const tvImages = await TvService.getTvImages(tvId)
      return tvImages
    },
    async getTvExternalIds(context, tvId) {
      const tvExternalIds = await TvService.getTvExternalIds(tvId)
      return tvExternalIds
    },
    async getTvByKeyword(context, keyword) {
      const tv = await TvService.getTvByKeyword(keyword)
      return tv
    },
    async getTvCredits(context, id) {
      const tvCredits = await TvService.getTvCredits(id)
      return tvCredits
    }
  }
}