const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ email, password }) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ email, password }))
    // .catch(err=>'not found')
}

function loadFromSession(email) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ email }))
}

function addToListByType(userId, addItem, listType) {
    userId = ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            db.collection('users').updateOne(
                {
                    "_id": userId,
                    "lists.name": listType
                },
                {
                    $push: { "lists.$.items": addItem }
                }
            )
        })
}

function removeFromListByType(userId, itemId, listType) {
    // console.log(userId, itemId, listType)
    itemId = +itemId
    userId = ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            db.collection('users').updateOne(
                {
                    "_id": userId,
                    "lists.name": listType
                },
                {
                    $pull: { "lists.$.items": { id: itemId } }
                }
            )
        })
}

function markWatched(userId, showId, epId) {
    userId = ObjectId(userId)
    showId = +showId
    epId = +epId
    return mongoService.connect()
        .then(db => {
            let show = db.collection('users').findOne(
                {
                    "_id": userId,
                    "watchedEpisodes.id": showId
                })
            return show
        })
        .then(show => {
            if (show) {
                return mongoService.connect()
                    .then(db => {
                        db.collection('users').updateOne(
                            {
                                "_id": userId,
                                "watchedEpisodes.id": showId
                            },
                            {
                                $addToSet: { "watchedEpisodes.$.episodes": { epId } }
                            }

                        )
                    })
            } else {
                return mongoService.connect()
                    .then(db => {
                        let itemObj = { id: showId, episodes: [{ epId }] }
                        db.collection('users').updateOne(
                            {
                                "_id": userId,
                            },
                            {
                                $push: { "watchedEpisodes": itemObj }
                            }
                        )
                    })
            }
        })
}

function unmarkWatched(userId, showId, epId) {
    userId = ObjectId(userId)
    showId = +showId
    epId = +epId
    return mongoService.connect()
        .then(db => {
            db.collection('users').updateOne(
                {
                    "_id": userId,
                    "watchedEpisodes.id": showId
                },
                {
                    $pull: { "watchedEpisodes.$.episodes": { epId: epId } }
                }
            )
        })
}

function addActivityByType(userId, activity) {
    userId = ObjectId(userId)
    activity._id = ObjectId(activity._id)
    return mongoService.connect()
        .then(db => {
            db.collection('users').updateOne(
                {
                    "_id": userId,
                },
                {
                    $push: { "userActivities": activity }
                }
            )
        })
        .then(result => {
            return activity;
        })
}

function updateActivity(activity) {
    let byUserId = ObjectId(activity.byUser._id)
    activity._id = ObjectId(activity._id)
    return mongoService.connect()
        .then(db => {
            return db.collection('users').updateOne(
                {
                    "_id": byUserId,
                    "userActivities._id": activity._id
                },
                { $set: { "userActivities.$": activity } }
            )
        })
        .then(result => {
            return activity;
        })
}

function getActivitiesByFollowed(followedId) {
    followedId = ObjectId(followedId)
    return mongoService.connect()
        .then(db => db.collection('users').find({ _id: followedId }).toArray())
        .then(res => res[0].userActivities)
}

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ _id }))
}

function query() {
    return mongoService.connect()
        .then(db => db.collection('toys').find({}).toArray())
}

// todo  - add user only if nickname is not taken
function createUser(user) {
    user._id = new ObjectId()
    return mongoService.connect()
        .then(db => db.collection('users').insertOne(user))
}






module.exports = {
    query,
    getById,
    getActivitiesByFollowed,
    createUser,
    checkLogin,
    loadFromSession,
    addToListByType,
    removeFromListByType,
    markWatched,
    unmarkWatched,
    addActivityByType,
    updateActivity
}