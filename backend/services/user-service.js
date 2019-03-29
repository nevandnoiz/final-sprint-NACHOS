const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ email, password }) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ email, password }))
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
    activity._id = new ObjectId()
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

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }))
}

function query() {
    return mongoService.connect()
        .then(db => db.collection('toys').find({}).toArray())
}

// todo  - add user only if nickname is not taken
function addUser({ nickname }) {
    var user = { nickname }
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}






module.exports = {
    query,
    getById,
    addUser,
    checkLogin,
    loadFromSession,
    addToListByType,
    removeFromListByType,
    markWatched,
    unmarkWatched,
    addActivityByType
}