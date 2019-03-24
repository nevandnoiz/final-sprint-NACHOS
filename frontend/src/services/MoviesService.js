import axios from 'axios'

export default {
    getTrendingMovies,
    getMovieDetails,
    getMovieImages,
    getMovieExternalIds,
    getMoviesByKeyword,
    getMovieWatchLinksByKeyword,
    getMovieCredits,
    getMovieVideos,
}

async function getTrendingMovies(page = 1) {
    let res = await axios.get(`http://localhost:3003/movies/${page}`)
    const trending = res.data
    return trending
}

async function getMovieDetails(id) {
    let res = await axios.get(`http://localhost:3003/movies/details/${id}`)
    return res.data
}

async function getMovieImages(id) {
    let res = await axios.get(`http://localhost:3003/movies/imgs/${id}`)
    return res.data
}

async function getMovieExternalIds(id) {
    let res = await axios.get(`http://localhost:3003/movies/links/${id}`)
    return res.data
}

async function getMoviesByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data
    return tv
}

async function getMovieCredits(id) {
    let res = await axios.get(`http://localhost:3003/movies/credits/${id}`)
    return res.data
}

async function getMovieWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    const res = await axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
    const links = res.data
    return links
}

async function getMovieVideos(id) {
    let res = await axios.get(`http://localhost:3003/movies/videos/${id}`)
    return res.data
}