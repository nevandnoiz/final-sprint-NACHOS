import UserServies from '../services/UserService';

export default {
  state: {
    currUser: '',
    activities: null,
  },
  getters: {
    activities: state => state.activities,
    currUser: state => state.currUser,
    currUserId: state => state.currUser._id,
    currUserLists: state => state.currUser.lists,
    getUserForComment: function (state) {
      if (state.currUser) return {
        _id: state.currUser._id,
        name: state.currUser.name,
        img: state.currUser.img
      }
    },
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
    },
    addToList(state, { addedItem, listType }) {
      let lists = state.currUser.lists
      const listIdx = lists.findIndex(list => list.name === listType)
      state.currUser.lists[listIdx].items.push(addedItem)
      console.log(state.currUser)
    },
    removeFromList(state, { itemId, listType }) {
      let lists = state.currUser.lists
      const listIdx = lists.findIndex(list => list.name === listType)
      const itemIdx = lists[listIdx].items.findIndex(item => item.id === itemId)
      state.currUser.lists[listIdx].items.splice(itemIdx, 1)
      console.log(state.currUser)
    },
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
    async addToListByType(context, {addedItem, listType}) {
      console.log(listType)
      let userId = context.getters.currUserId
      const add = await UserServies.addToListByType(addedItem, userId, listType)
      console.log('commit')
      context.commit({ type: 'addToList', addedItem, listType })
    },
    async removeFromListByType(context, {itemId, listType}) {
      let userId = context.getters.currUserId
      const remove = await UserServies.removeFromListByType(itemId, userId, listType)
      console.log('commit')
      context.commit({ type: 'removeFromList', itemId, listType })
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