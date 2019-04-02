import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true
})
import util from '../services/UtilityService.js'

export default {
    getFollowedActivities,
    loginUser,
    loadUser,
    addCommentToActivity,
    toggleLikeActivity,
    addToListByType,
    removeFromListByType,
    addActivityByType,
    markWatched,
    unmarkWatched,
    signOut
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3003';

const users = []

// const activities = [
//     {
//         _id: 'abc321321',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Eyal',
//                 lastName: 'wiener'
//             }, _id: 'abc123'
//         },
//         item_id: 79501,
//         item_type: 'tv',
//         itemTitle: "Doom Patrol",
//         type: 'activity',
//         activity: 'rate',
//         value: 5,
//         comments: [],
//         likes: 7
//     },
//     {
//         _id: 'abc321356',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Yaniv',
//                 lastName: 'wiener'
//             }, _id: '987agv'
//         },
//         item_id: 324857,
//         item_type: 'movies',
//         itemTitle: "Spider-Man: Into the Spider-Verse",
//         type: 'activity',
//         activity: 'listAdd',
//         value: 'Favorite',
//         comments: [],
//         likes: 0
//     },
//     {
//         _id: '098765456',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Yaniv',
//                 lastName: 'wiener'
//             }, _id: '987agv'
//         },
//         item_id: 1399,
//         item_type: 'tv',
//         itemTitle: "Game Of Thrones",
//         type: 'activity',
//         activity: 'listAdd',
//         value: 'watchList',
//         comments: [],
//         likes: 0
//     }
// ]

async function getFollowedActivities(userId, following) {
    let prms = []
    following.forEach(followed => {
        let followedId = followed._id
        prms.push(axios.get(`${BASE_URL}/user/${userId}/activities/${followedId}`))
    })
    let res = await Promise.all(prms)
    let acitivites = res.map(activity => activity.data)
    return acitivites.flat()
}

function addToListByType(addedItem, userId, listType) {
    return axios.post(`${BASE_URL}/user/${userId}/lists/${listType}`, addedItem)
}

function removeFromListByType(itemId, userId, listType) {
    return axios.delete(`${BASE_URL}/user/${userId}/lists/${listType}/${itemId}`)
}

function markWatched(userId, showId, epId) {
    return axios.post(`${BASE_URL}/user/${userId}/episodes/${showId}`, { epId })
}

function unmarkWatched(userId, showId, epId) {
    return axios.delete(`${BASE_URL}/user/${userId}/episodes/${showId}/${epId}`)
}

function addActivityByType(user, item, itemType, activityType, value) {
    let activity = _createActivity(user, item, itemType, activityType, value)
    return axios.post(`${BASE_URL}/user/${user._id}/activities`, activity)
}

function addCommentToActivity(comment, activity) {
    let userId = comment.user._id
    let newActivity = util.deepCopy(activity)
    newActivity.comments.push(comment)
    return axios.put(`${BASE_URL}/user/${userId}/activities/comment`, newActivity)
    //TODO: replace the activty in the server for the user
    // return newActivity // return the new obj from the server after update succes
}

function toggleLikeActivity(activity,diff,userId) {
    let newActivity = util.deepCopy(activity)
    newActivity.likes+=diff
    return axios.put(`${BASE_URL}/user/${userId}/activities/like`, newActivity)
}

function loginUser(loginDetails) {
    return axios.post(`${BASE_URL}/login`,
    loginDetails
    )
        .then(res => res.data)
        .catch(err=>err)
}

function loadUser() {
    return axios.get(`${BASE_URL}/login`)
        .then(res => {
            return res.data
        })
}

async function signOut() {
    return axios.post(`${BASE_URL}/signout`)
}

function _createActivity(user, item, itemType, activityType, value) {
    return {
        timestamp: Date.now(),
        byUser: {
            name: {
                firstName: user.name.firstName,
                lastName: user.name.lastName,
            },
            _id: user._id
        },
        item_id: item.id,
        item_type: itemType,
        itemTitle: (item.title) ? item.title : item.name,
        type: 'activity',
        activity: activityType,
        value: value,
        comments: [],
        likes: 0
    }
}