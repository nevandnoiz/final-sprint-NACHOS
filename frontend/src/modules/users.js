import UserServies from '../services/UserService';

export default {
  state: {
    currUser: null,
    activities: null,
    doneLoadingUser: false
  },
  getters: {
    doneLoadingUser: state => state.doneLoadingUser,
    activities: state => state.activities,
    currUser: state => state.currUser,
    currUserId: state => state.currUser._id,
    currUserLists: state => state.currUser.lists,
    currUserFollowing: state => state.currUser.following,
    currUserWatchedEpisodes: state => state.currUser.watchedEpisodes,
    getUserForComment: function (state) {
      if (state.currUser) return {
        _id: state.currUser._id,
        name: state.currUser.name,
        img: state.currUser.img
      }
    },
  },
  mutations: {
    setActivities(state, activities) {
      state.activities = activities
    },
    setUser(state, user) {
      state.currUser = user
    },
    setDoneLoadingUser(state) {
      state.doneLoadingUser = true
    },
    updateActivity(state, { newActivity }) {
      const idx = state.activities.findIndex(activity => activity._id === newActivity._id)
      state.activities.splice(idx, 1, newActivity)
    },
    addToList(state, { addedItem, listType }) {
      let lists = state.currUser.lists
      const listIdx = lists.findIndex(list => list.name === listType)
      state.currUser.lists[listIdx].items.push(addedItem)
    },
    removeFromList(state, { itemId, listType }) {
      let lists = state.currUser.lists
      const listIdx = lists.findIndex(list => list.name === listType)
      const itemIdx = lists[listIdx].items.findIndex(item => item.id === itemId)
      state.currUser.lists[listIdx].items.splice(itemIdx, 1)
    },
    addWatchedEp(state, { showId, epId }) {
      let watched = state.currUser.watchedEpisodes
      const showIdx = watched.findIndex(show => show.id === showId)
      if (showIdx < 0) state.currUser.watchedEpisodes.push({ id: showId, episodes: [{ epId }] })
      else state.currUser.watchedEpisodes[showIdx].episodes.push({ epId })
    },
    removeWatchedEp(state, { showId, epId }) {
      let watched = state.currUser.watchedEpisodes
      const showIdx = watched.findIndex(show => show.id === showId)
      const epIdx = watched[showIdx].episodes.findIndex(ep => ep.epId === epId)
      state.currUser.watchedEpisodes[showIdx].episodes.splice(epIdx, 1)
    },
    addActivity(state, { activity }) {
      state.currUser.userActivities.push(activity)
    },
  },
  actions: {
    async loadActivities(context, payload) {
      const activities = await UserServies.getActivities()
      context.commit('setActivities', activities)
    },
    async getFollowedActivities(context, payload) {
      let userId = context.getters.currUserId
      let following = context.getters.currUserFollowing
      const activities = await UserServies.getFollowedActivities(userId, following)
      context.commit('setActivities', activities)
    },
    async loadUser(context, payload) {
      const user = await UserServies.loadUser()
      if (user) context.commit('setUser', user)
    },
    async loginUser(context, loginDetails) {
      const user = await UserServies.loginUser(loginDetails)
      if (user._id) context.commit('setUser', user)
      return user
    },
    async signOut(context) {
      const user = await UserServies.signOut()
      context.commit('setActivities', null)
      return context.commit('setUser', null)
    },
    async addToListByType(context, { addedItem, listType }) {
      let userId = context.getters.currUserId
      const add = await UserServies.addToListByType(addedItem, userId, listType)
      context.commit({ type: 'addToList', addedItem, listType })
    },
    async removeFromListByType(context, { itemId, listType }) {
      let userId = context.getters.currUserId
      const remove = await UserServies.removeFromListByType(itemId, userId, listType)
      context.commit({ type: 'removeFromList', itemId, listType })
    },
    async markWatched(context, { showId, epId }) {
      let userId = context.getters.currUserId
      const mark = await UserServies.markWatched(userId, showId, epId)
      context.commit({ type: 'addWatchedEp', showId, epId })
    },
    async unmarkWatched(context, { showId, epId }) {
      let userId = context.getters.currUserId
      const unmark = await UserServies.unmarkWatched(userId, showId, epId)
      context.commit({ type: 'removeWatchedEp', showId, epId })
    },
    async addActivityByType(context, { item, itemType, activityType, value }) {
      let user = context.getters.currUser
      const res = await UserServies.addActivityByType(user, item, itemType, activityType, value)
      let activity = res.data
      context.commit({ type: 'addActivity', activity })
    },
    async toggleLikeActivity(context, { activity, diff }) {
      let userId = context.getters.currUserId
      const res = await UserServies.toggleLikeActivity(activity, diff, userId)
      let newActivity = res.data
      context.commit({ type: 'updateActivity', newActivity })
    },

    async addCommentToActivity(context, { comment, activity }) {
      const commentObj = {
        user: context.getters.getUserForComment,
        comment,
        timestamp: Date.now()
      }
      const res = await UserServies.addCommentToActivity(commentObj, activity)
      let newActivity = res.data
      context.commit({ type: 'updateActivity', newActivity })
    }
    // async addToWatchList(context, payload) {
    //   const user = await UserServies.addToWatchList()
    //   // context.commit('setUser', user })
    //   return user
    // },
  }
}