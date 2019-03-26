import axios from 'axios'

export default {
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
    getSeasonDetails
}

async function getTrendingShows(page = 1) {
    let res = await axios.get(`http://localhost:3003/tv/${page}`)
    const trending = res.data
    return trending
}

async function getTvShowDetails(id) {
    let res = await axios.get(`http://localhost:3003/tv/details/${id}`)
    return res.data
}

async function getTvShowImages(id) {
    let res = await axios.get(`http://localhost:3003/tv/imgs/${id}`)
    return res.data
}

async function getTvShowExternalIds(id) {
    let res = await axios.get(`http://localhost:3003/tv/links/${id}`)
    return res.data
}

async function getTvShowByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data
    return tv
}

async function getTvShowCredits(id) {
    let res = await axios.get(`http://localhost:3003/tv/credits/${id}`)
    return res.data
}

async function getTvShowReviews(id) {
    let res = await axios.get(`http://localhost:3003/tv/reviews/${id}`)
    console.log(res)
    return res.data
}

async function getTvShowSeasons(id) {
    let res = await axios.get(`http://localhost:3003/seasons/credits/${id}`)
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
    let res = await axios.get(`http://localhost:3003/tv/videos/${id}`)
    return res.data
}
async function getSeasonDetails(id, seasons) {
    let prms = []
    seasons.forEach(season=>{
        if (season.name !== "Specials")
        prms.push(axios.get(`http://localhost:3003/tv/${id}/season/${season.season_number}`))
    })
    let res=await axios.all(prms)
    return res
}