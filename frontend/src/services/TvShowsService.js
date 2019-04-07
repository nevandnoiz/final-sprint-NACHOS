import axios from 'axios'

export default {
    getTopRatedShows,
    getPopularShows,
    getTrendingShows,
    getTvShowDetails,
    getTvShowImages,
    getTvShowExternalIds,
    getTvShowByKeyword,
    getTvShowCredits,
    getTvShowReviews,
    getTvShowSeasons,
    getTvShowWatchLinksByKeyword,
    getTvShowVideos,
    getSeasonsDetails
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003';

async function getTopRatedShows(page = 1) {
    let res = await axios.get(`${BASE_URL}/tv/top_rated/${page}`)
    const tvShows = res.data
    return tvShows
}

async function getPopularShows(page = 1) {
    let res = await axios.get(`${BASE_URL}/tv/popular/${page}`)
    const tvShows = res.data
    return tvShows
}

async function getTrendingShows(page = 1) {
    let res = await axios.get(`${BASE_URL}/tv/trending/${page}`)
    const tvShows = res.data
    return tvShows
}

async function getTvShowDetails(id) {
    let res = await axios.get(`${BASE_URL}/tv/details/${id}`)
    return res.data
}

async function getTvShowImages(id) {
    let res = await axios.get(`${BASE_URL}/tv/imgs/${id}`)
    return res.data
}

async function getTvShowExternalIds(id) {
    let res = await axios.get(`${BASE_URL}/tv/links/${id}`)
    return res.data
}

async function getTvShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data
    return tv
}

async function getTvShowCredits(id) {
    let res = await axios.get(`${BASE_URL}/tv/credits/${id}`)
    return res.data
}

async function getTvShowReviews(id) {
    let res = await axios.get(`${BASE_URL}/tv/reviews/${id}`)
    return res.data
}

async function getTvShowSeasons(id) {
    let res = await axios.get(`${BASE_URL}/seasons/credits/${id}`)
    return res.data
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
    let res = await axios.get(`${BASE_URL}/tv/videos/${id}`)
    return res.data
}
async function getSeasonsDetails(id, seasons) {
    let prms = []
    seasons.forEach(season=>{
        if (season.name !== "Specials")
        prms.push(axios.get(`${BASE_URL}/tv/${id}/season/${season.season_number}`))
    })
    let res=await axios.all(prms)
    return res
}