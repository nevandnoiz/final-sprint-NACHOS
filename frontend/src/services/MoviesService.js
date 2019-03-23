import axios from 'axios'

export default {
    getPopularMovies,
    getMovieDetails,
    getMovieImages,
    getMovieExternalIds,
    getMoviesByKeyword,
    getMovieCredits,
    getMovieVideos,
}

async function getPopularMovies(page = 1) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=${page}`)
    const popular = res.data.results
    // let results = popular.map(movie =>
    //     (({ backdrop_path, genre_ids, id, overview, poster_path, release_date, title, vote_average }) =>
    //         ({ backdrop_path, genre_ids, id, overview, poster_path, release_date, title, vote_average }))(movie)
    // )
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

async function getMoviesByKeyword(keyword) {
    keyword = keyword.replace(/\s/gm, '%20')
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const movies = res.data
    return movies
}

async function getMovieCredits(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=fd807ad0f521ce282a03431f7288592d`)
    const movieCredits = res.data
    return movieCredits
}

async function getMovieVideos(id) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US`)
    const movieVideos = res.data
    return movieVideos
}