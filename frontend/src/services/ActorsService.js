import axios from 'axios'

export default {
    getPopularActors,
    getActorDetails,
    getActorImages,
    getActorExternalIds,
    getActorsByKeyword,
    getActorWatchLinksByKeyword,
    getActorCredits,
    getActorVideos,
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
? '/actors'
: '//localhost:3003/actors';

async function getPopularActors(page = 1) {
    let res = await axios.get(`${BASE_URL}/${page}`)
    const popular = res.data
    return popular
}

async function getActorDetails(id) {
    let res = await axios.get(`${BASE_URL}/details/${id}`)
    return res.data
}

async function getActorImages(id) {
    let res = await axios.get(`${BASE_URL}/imgs/${id}`)
    return res.data
}

async function getActorExternalIds(id) {
    let res = await axios.get(`${BASE_URL}/links/${id}`)
    return res.data
}

async function getActorsByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.theactordb.org/3/search/actor?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const tv = res.data
    return tv
}

async function getActorCredits(id) {
    let res = await axios.get(`${BASE_URL}/credits/${id}`)
    return res.data
}

async function getActorWatchLinksByKeyword(keyword, region) {
    keyword = keyword.replace(/\s/gm, '+')
    region ? region = '&country=' + region : region = ''
    const URL = `https://utelly-tv-shows-and-actors-availability-v1.p.rapidapi.com/lookup?term=${keyword}${region}`
    const res = await axios.get(URL, { headers: { "X-RapidAPI-Key": "fc51f98f04msh7d514ceb8ead63dp170479jsncdd8ac8a4928" } })
    const links = res.data
    return links
}

async function getActorVideos(id) {
    let res = await axios.get(`${BASE_URL}/videos/${id}`)
    return res.data
}