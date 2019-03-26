const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ nickname }) {
    return mongoService.connect()
        .then(db => db.collection('review').findOne({ nickname }))
}


function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('review').findOne({ _id }))
}



function getSelectedItemReviews(itemType,reviewId) {
    // return mongoService.connect()
    //     .then(db => db.collection('toys').find({}).toArray())
    return reviews
}

// todo  - add review only if nickname is not taken
function addReview(newReview,itemType, itemId) {
    reviews.push(newReview)
    // var review = { nickname }
    // return mongoService.connect()
    //     .then(db => db.collection('review').insertOne(review))
    //     .then(res => {
    //         review._id = res.insertedId
    //         return review
    //     })
}







module.exports = {
    getSelectedItemReviews,
    getById,
    addReview,
    checkLogin
}