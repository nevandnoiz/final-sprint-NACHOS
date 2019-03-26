import UserServies from '../services/UserService';

export default {
  state: {
    currUser: null,
    activities: null,
  },
  getters: {
    activities: state => state.activities,
    currUser: state => state.currUser
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
    addLikeToActivity(state, { newActivity }) {
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
    async addLikeToActivity(context, activity) {
      const newActivity = await UserServies.addLikeToActivity(activity)
      context.commit({ type: 'addLikeToActivity', newActivity })
    }
    // async addToWatchList(context, payload) {
    //   const user = await UserServies.addToWatchList()
    //   // context.commit({ type: 'setUser', user })
    //   return user
    // },
  }
}