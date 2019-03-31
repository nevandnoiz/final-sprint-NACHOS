const MoviesService = require('../services/movies-service')

function addTvRoutes(app) {

    // LIST
    app.get('/movies/top_rated/:page/', (req, res) => {
        const page = req.params.page;
        MoviesService.getTopRatedMovies(page)
            .then(movies => res.send(movies))
    })
    app.get('/movies/popular/:page/', (req, res) => {
        const page = req.params.page;
        MoviesService.getPopularMovies(page)
            .then(movies => res.send(movies))
    })
    app.get('/movies/trending/:page/', (req, res) => {
        const page = req.params.page;
        MoviesService.getTrendingMovies(page)
            .then(movies => res.send(movies))
    })

    // SINGLE - GET Full details including reviews
    app.get('/movies/details/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMovieShowDetails(movieId)
            .then(details =>res.send(details))
    })
    app.get('/movies/imgs/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMovieShowImages(movieId)
            .then(images => res.send(images))
    })
    app.get('/movies/links/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMovieShowExternalIds(movieId)
            .then(links => res.send(links))
    })
    app.get('/movies/credits/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMovieShowCredits(movieId)
            .then(credits => res.send(credits))
    })
    app.get('/movies/reviews/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMoviesReviews(movieId)
        .then(reviews => {
            return res.send(reviews)
        })
    })
    app.post('/movies/reviews/:id', (req, res) => {
        const movieId = req.params.id;
        const newReview = req.body
        MoviesService.addReview(newReview, movieId)
        .then(()=>res.send('Worked'))
        // .then(review => res.send('great'))
    })
    app.get('/movies/videos/:id', (req, res) => {
        const movieId = req.params.id;
        MoviesService.getMovieShowVideos(movieId)
            .then(videos => res.send(videos))
    })

    // DELETE
    // app.delete('/movies/:movieId', (req, res) => {
    //     const movieId = req.params.movieId;
    //     MoviesService.remove(movieId)
    //         .then(() => res.end(`Tv ${movieId} Deleted `))
    // })

    // CREATE
    // app.post('/tv', (req, res) => {
    //     const tv = req.body;
    //     MoviesService.add(tv)
    //         .then(tv => {
    //             res.json(tv)
    //         })
    // })

    // UPDATE
    // app.put('/movies/:movieId', (req, res) => {
    //     const tv = req.body;
    //     MoviesService.update(tv)
    //         .then(tv => res.json(tv))
    // })

}


module.exports = addTvRoutes;