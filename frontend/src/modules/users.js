import UserServies from '../services/UserService';

export default {
  state: {
    currUser: null,
    activities: null,
  },
  getters: {
    activities: state => state.activities,
    currUser: state => state.currUser,
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
      const user = await UserServies.getUser()
      context.commit({ type: 'setUser', user })
      return user
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