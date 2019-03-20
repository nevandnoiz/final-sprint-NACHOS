import UserServies from '../services/UserService';

export default {
  state: {
    currUser: null,
    activities: null,
  },
  getters: {
    activities: (state) => {
      console.log(state.activities)
      return state.activities
    }
  },
  mutations: {
    setCurrUser(state, { user }) {
      state.currUser = user
    },
    setActivities(state, { activities }) {
      // console.log(activities);
      state.activities = activities
    },

  },
  actions: {
    async loadActivities(context, payload) {
      const activities = await UserServies.getActivities()
      context.commit({ type: 'setActivities', activities })
    },
  }
}