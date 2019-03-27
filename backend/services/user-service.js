const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ email, password }) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ email, password }))
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
    userId = ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            db.collection('users').update(
                {
                    "_id": userId,
                    "lists.name": listType,
                },
                {
                    $pull: { "lists.$.items": {"id":itemId} }
                }
            )
                .then(res => console.log(res))
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
    addToListByType,
    removeFromListByType
}