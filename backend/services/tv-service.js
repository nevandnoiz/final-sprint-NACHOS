const axios = require('axios')
const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getTopRatedShows,
    getPopularShows,
    getTrendingShows,
    getTvShowDetails,
    getTvShowImages,
    getTvShowExternalIds,
    getTvShowByKeyword,
    getTvShowCredits,
    getTvShowReviews,
    addReview,
    getTvShowSeasons,
    getTvShowWatchLinksByKeyword,
    getTvShowVideos,
    getSeasonDetails,
}

function getTopRatedShows(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
        .then(res => res.data.results)
        .catch(err => {
            console.log(err)
        })
}

function getPopularShows(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
        .then(res => res.data.results)
        .catch(err => {
            console.log(err)
        })
}

function getTrendingShows(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
        .then(res => res.data.results)
        .catch(err => {
            console.log(err)
        })
}

function getTvShowDetails(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log('details')
        })
}

function getTvShowImages(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

// Get the external ids for a tv. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
function getTvShowExternalIds(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getTvShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    return axios.get(`https://api.themoviedb.org/3/search/tv?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getTvShowCredits(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getTvShowReviews(id) {
    let collection = ''
    return mongoService.connect()
        .then(db => {
            collection = db.collection('tv-reviews')
            return db.collection('tv-reviews').find({ itemId: id }).toArray()
        })
        .then(dbReviews => {
            if (!dbReviews.length) {
                return axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=fd807ad0f521ce282a03431f7288592d`)
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

function addReview(newReview, tvShowId) {
    newReview.id = new ObjectId()
    return mongoService.connect()
    .then(db => {
            db.collection('tv-reviews').updateOne({
                itemId: tvShowId
            }, {
                    $push: {
                        reviews: newReview
                    }
                })
                .then(() => newReview)
        })
}

function getTvShowSeasons(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/season/1?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getTvShowWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    return axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}
function getTvShowVideos(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}
function getSeasonDetails(id, seasonNum) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => {
            let result = res.data
            let episodes = result.episodes.map(episode =>
                (({ air_date, episode_number, id, name, overview, season_number, show_id, still_path, vote_average }) =>
                    ({ air_date, episode_number, id, name, overview, season_number, show_id, still_path, vote_average }))(episode)
            )
            let seasonDetails = (({ air_date, id, name, overview, poster_path, season_number }) =>
                ({ air_date, id, name, overview, poster_path, season_number }))(result)
            seasonDetails.episodes = episodes
            return seasonDetails
        })
        .catch(err => {
            console.log(err)
        })
}

function _getRandomRating() {
    return (Math.floor(Math.random() * (5 - 0 + 1)));
}
