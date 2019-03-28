const axios = require('axios')
const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getTrendingMovies,
    getMovieShowDetails,
    getMovieShowImages,
    getMovieShowExternalIds,
    getMovieShowByKeyword,
    getMovieShowCredits,
    getMoviesReviews,
    addReview,
    getMovieWatchLinksByKeyword,
    getMovieShowVideos,
}

function getTrendingMovies(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
        .then(res => res.data.results)
        .catch(err => {
            console.log(err)
        })
    // const popular = res.data
    // return popular
}

function getMovieShowDetails(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log('details')
        })
}

function getMovieShowImages(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

// Get the external ids for a tv. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
function getMovieShowExternalIds(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getMovieShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getMovieShowCredits(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getMoviesReviews(id) {
    let collection = ''
    return mongoService.connect()
        .then(db => {
            collection = db.collection('movie-reviews')
            return db.collection('movie-reviews').find({ itemId: id }).toArray()
        })
        .then(dbReviews => {
            if (!dbReviews.length) {
                return axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=fd807ad0f521ce282a03431f7288592d`)
                    .then(res => {
                        let reviews = res.data.results
                        return reviews.map(review => {
                            return {
                                id: review.id,
                                author: review.author,
                                content: review.content,
                                rating: _getRandomRating()
                            }
                        })
                    })
                    .then(reviews => {
                        collection.insertOne({ itemId: id, reviews })
                        return reviews
                    })
            } else {
                return dbReviews[0].reviews
            }
        })
}

function addReview(newReview, movieId) {
    newReview.id = new ObjectId()
    return mongoService.connect()
    .then(db => {
            db.collection('movie-reviews').updateOne({
                itemId: movieId
            }, {
                    $push: {
                        reviews: newReview
                    }
                })
                .then(() => newReview)
        })
}

function getMovieWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    return axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}
function getMovieShowVideos(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function _getRandomRating() {
    return (Math.floor(Math.random() * (10 - 0 + 1))) / 2;
}
