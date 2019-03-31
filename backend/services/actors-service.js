const axios = require('axios')

module.exports = {
    getPopularActors,
    getActorShowDetails,
    getActorShowImages,
    getActorShowExternalIds,
    getActorShowByKeyword,
    getActorMovieCredits,
    getActorWatchLinksByKeyword,
    getActorShowVideos,
}


function getActorShowDetails(id) {
    console.log(id)
    return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        // .catch(err => {
        //     // console.log(err)
        // })
}


function getPopularActors(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/person/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
        .then(res => res.data.results)
        .catch(err => {
            console.log(err)
        })
    // const popular = res.data
    // return popular
}


function getActorMovieCredits(id) {
    return axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}















function getActorShowImages(id) {
    return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}















// Get the external ids for a tv. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
function getActorShowExternalIds(id) {
    return axios.get(`https://api.themoviedb.org/3/actor/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

function getActorShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    return axios.get(`https://api.themoviedb.org/3/search/actor?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}











function getActorWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-actors-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    return axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}
function getActorShowVideos(id) {
    return axios.get(`https://api.themoviedb.org/3/actor/${id}/videos?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}