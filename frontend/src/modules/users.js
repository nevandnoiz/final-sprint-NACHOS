import UserServies from '../services/UserService';

export default {
  state: {
    currUser: null,
    activities: null,
  },
  getters: {
    activities: state => state.activities,
    currUser: state => state.currUser,
    currUserId: state => state.currUser._id,
    getUserForComment: function (state) {
      if (state.currUser) return {
        _id: state.currUser._id,
        name: state.currUser.name,
        img: state.currUser.img
      }
    }
  },
  mutations: {
    setCurrUser(state, { user }) {
      state.currUser = user
    },
    setActivities(state, { activities }) {
      state.activities = activities
    },
    setUser(state, { user }) {
      state.currUser = user
    },
    updateActivity(state, { newActivity }) {
      const idx = state.activities.findIndex(activity => activity._id === newActivity._id)
      state.activities.splice(idx, 1, newActivity)
    }
  },
  actions: {
    async loadActivities(context, payload) {
      const activities = await UserServies.getActivities()
      context.commit({ type: 'setActivities', activities })
    },
    async loadUser(context, payload) {
      const user = await UserServies.loadUser()
      if (user) context.commit({ type: 'setUser', user })
    },
    async loginUser(context, payload) {
      const user = await UserServies.loginUser()
      context.commit({ type: 'setUser', user })
      return user
    },
    async addToListByType(context, addedItem) {
      let userId=context.getters.currUserId
      const addToList = await UserServies.addToListByType(addedItem,userId)
      // context.commit({ type: 'updateActivity', newActivity })
    },
    async removeFromListByType(context, itemId) {
      let userId=context.getters.currUserId
      const addToList = await UserServies.removeFromListByType(itemId,userId)
      // context.commit({ type: 'updateActivity', newActivity })
    },
    async addLikeToActivity(context, activity) {
      const newActivity = await UserServies.addLikeToActivity(activity)
      context.commit({ type: 'updateActivity', newActivity })
    },

    async addCommentToActivity(context, { comment, activity }) {
      const commentObj = {
        user: context.getters.getUserForComment,
        comment,
        timestamp: Date.now()
      }
      const newActivity = await UserServies.addCommentToActivity(commentObj, activity)
      context.commit({ type: 'updateActivity', newActivity })
    }
    // async addToWatchList(context, payload) {
    //   const user = await UserServies.addToWatchList()
    //   // context.commit({ type: 'setUser', user })
    //   return user
    // },
  }
}