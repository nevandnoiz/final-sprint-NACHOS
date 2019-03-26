const TvService = require('../services/tv-service')

function addTvRoutes(app) {

    // LIST
    app.get('/tv/:page', (req, res) => {
        const page = req.params.page;
        TvService.getTrendingShows(page)
            .then(tvShows => res.send(tvShows))
    })

    // SINGLE - GET Full details including reviews
    app.get('/tv/details/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowDetails(tvShowId)
            .then(details => res.send(details))
    })
    app.get('/tv/imgs/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowImages(tvShowId)
            .then(images => res.send(images))
    })
    app.get('/tv/links/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowExternalIds(tvShowId)
            .then(links => res.send(links))
    })
    app.get('/tv/credits/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowCredits(tvShowId)
        .then(credits => res.send(credits))
    })
    app.get('/tv/reviews/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowReviews(tvShowId)
        .then(reviews => {
            return res.send(reviews)
        })
    })
    app.post('/tv/reviews/:id', (req, res) => {
        const tvShowId = req.params.id;
        const newReview = req.body
        TvService.addReview(newReview, tvShowId)
        .then(()=>res.send('Worked'))
        // .then(review => res.send('great'))
    })
    app.get('/tv/videos/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowVideos(tvShowId)
            .then(videos => res.send(videos))
    })
    app.get('/tv/seasons/:id', (req, res) => {
        const tvShowId = req.params.id;
        TvService.getTvShowSeasons(tvShowId)
            .then(seasons => res.send(seasons))
    })
    app.get('/tv/:id/season/:num', (req, res) => {
        const tvShowId = req.params.id;
        const seasonNum = req.params.num;
        TvService.getSeasonDetails(tvShowId, seasonNum)
            .then(seasons => res.send(seasons))
    })

    // DELETE
    // app.delete('/tv/:tvShowId', (req, res) => {
    //     const tvShowId = req.params.tvShowId;
    //     TvService.remove(tvShowId)
    //         .then(() => res.end(`Tv ${tvShowId} Deleted `))
    // })

    // CREATE
    // app.post('/tv', (req, res) => {
    //     const tv = req.body;
    //     TvService.add(tv)
    //         .then(tv => {
    //             res.json(tv)
    //         })
    // })

    // UPDATE
    // app.put('/tv/:tvShowId', (req, res) => {
    //     const tv = req.body;
    //     TvService.update(tv)
    //         .then(tv => res.json(tv))
    // })

}


module.exports = addTvRoutes;