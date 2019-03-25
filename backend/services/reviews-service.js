const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

let reviews=[ {
    id: "57a814dc9251415cfb00309a",
    author: "NeoBrowser",
    score: "8",
    content:
      "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
    url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
  },
  {
    id: "57a814dc9251415cfb00309a",
    author: "NeoBrowser",
    score: "8",
    content:
      "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
    url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
  },
  {
    id: "57a814dc9251415cfb00309a",
    author: "NeoBrowser",
    score: "8",
    content:
      "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
    url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
  },]

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