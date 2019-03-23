import axios from 'axios'

export default {
    getPopularShows,
    getTvShowDetails,
    getTvShowImages,
    getTvShowExternalIds,
    getTvShowByKeyword,
    getTvShowCredits,
    getTvShowSeaons,
    getTvShowWatchLinksByKeyword,
    getTvShowVideos,
    getSeasonDetails
}

async function getPopularShows(page = 1) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
    const popular = res.data
    return popular
}

async function getTvShowDetails(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const tv = res.data
    return tv
}

async function getTvShowImages(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data
    return imgs
}

// Get the external ids for a tv. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
async function getTvShowExternalIds(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data
    return imgs
}

async function getTvShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data
    return tv
}

async function getTvShowCredits(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=fd807ad0f521ce282a03431f7288592d`)
    const tvCredits = res.data
    return tvCredits
}

async function getTvShowSeaons(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/1?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const tvCredits = res.data
    return tvCredits
}

async function getTvShowWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    const res = await axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
    const tvShowsLinks = res.data
    return tvShowsLinks
}
async function getTvShowVideos(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const tvVideos = res.data
    return tvVideos
}
async function getSeasonDetails(id,seasonNum) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const seasonDetails = res.data
    return seasonDetails
}

