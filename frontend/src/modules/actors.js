import ActorsService from '../services/ActorsService';

export default {
  state: {
    popularActors: '',
  },
  getters: {
    actorsToDisplay(state) {
      return state.popularActors
    },
  },
  mutations: {
    setPopularActors(state, { actors }) {
      state.popularActors = actors
    },
  },
  actions: {
    async loadPopularActors(context, payload) {
      const actors = await ActorsService.getPopularActors()
      context.commit({ type: 'setPopularActors', actors: actors })
    },
    async getActorDetails(context, actorId) {
      const actorDetails = await ActorsService.getActorDetails(actorId)
      return actorDetails
    },
    async getActorImages(context, actorId) {
      const actorImages = await ActorsService.getActorImages(actorId)
      return actorImages
    },
    async getActorExternalIds(context, actorId) {
      const actorExternalIds = await ActorsService.getActorExternalIds(actorId)
      return actorExternalIds
    },
    async getActorsByKeyword(context, keyword) {
      const actors = await ActorsService.getActorsByKeyword(keyword)
      return actors
    },
    async getActorCredits(context, id) {
      const actorCredits = await ActorsService.getActorCredits(id)
      return actorCredits
    },
    async getActorVideos(context, id) {
      const actorVideos = await ActorsService.getActorVideos(id)
      return actorVideos
    }
  }
}