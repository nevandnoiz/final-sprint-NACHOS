import axios from 'axios'

export default {
    getPopular,
    getDetailsById
}

async function getDetailsById(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const movie = res.data
    return movie
}

async function getPopular(page) {
    if(!page) page = 1
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
    const popular = res.data
    return popular
}