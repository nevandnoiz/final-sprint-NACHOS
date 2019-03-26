const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ email, password }) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({email,password}))
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
    checkLogin
}