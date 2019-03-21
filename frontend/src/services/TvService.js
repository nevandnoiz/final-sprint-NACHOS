import axios from 'axios'

export default {
    getPopularShows,
    getTvDetails,
    getTvImages,
    getTvExternalIds,
    getTvByKeyword,
    getTvCredits,
}

async function getPopularShows(page = 1) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
    const popular = res.data
    return popular
}

async function getTvDetails(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const tv = res.data
    return tv
}

async function getTvImages(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data 
    return imgs
}

// Get the external ids for a tv. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
async function getTvExternalIds(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data 
    return imgs
}

async function getTvByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data 
    return tv
}

async function getTvCredits(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=fd807ad0f521ce282a03431f7288592d`)
    const tvCredits = res.data
    return tvCredits
}