import axios from 'axios'

export default {
    getPopularMovies,
    getMovieDetails,
    getMovieImages,
    getMovieExternalIds
}



async function getPopularMovies(page) {
    if(!page) page = 1
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
    const popular = res.data
    return popular
}

async function getMovieDetails(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const movie = res.data
    return movie
}

async function getMovieImages(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data 
    return imgs
}

// Get the external ids for a movie. We currently support the following external sources. ex: facebook/instagram/imdb/twitter
async function getMovieExternalIds(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=fd807ad0f521ce282a03431f7288592d`)
    const imgs = res.data 
    return imgs
}