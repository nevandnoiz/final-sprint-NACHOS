const ActorsService = require('../services/actors-service')

function addTvRoutes(app) {

    // LIST
    app.get('/actors/:page', (req, res) => {
        const page = req.params.page;
        ActorsService.getPopularActors(page)
            .then(actors => res.send(actors))
    })

    // SINGLE - GET Full details including reviews
    app.get('/actors/details/:id', (req, res) => {
        const actorId = req.params.id;
        ActorsService.getActorShowDetails(actorId)
            .then(details =>res.send(details))
    })
    app.get('/actors/imgs/:id', (req, res) => {
        const actorId = req.params.id;
        ActorsService.getActorShowImages(actorId)
            .then(images => res.send(images))
    })
    app.get('/actors/links/:id', (req, res) => {
        const actorId = req.params.id;
        ActorsService.getActorShowExternalIds(actorId)
            .then(links => res.send(links))
    })
    app.get('/actors/credits/:id', (req, res) => {
        const actorId = req.params.id;
        ActorsService.getActorShowCredits(actorId)
            .then(credits => res.send(credits))
    })
    app.get('/actors/videos/:id', (req, res) => {
        const actorId = req.params.id;
        ActorsService.getActorShowVideos(actorId)
            .then(videos => res.send(videos))
    })

    // DELETE
    // app.delete('/actors/:tvShowId', (req, res) => {
    //     const tvShowId = req.params.tvShowId;
    //     ActorsService.remove(tvShowId)
    //         .then(() => res.end(`Tv ${tvShowId} Deleted `))
    // })

    // CREATE
    // app.post('/tv', (req, res) => {
    //     const tv = req.body;
    //     ActorsService.add(tv)
    //         .then(tv => {
    //             res.json(tv)
    //         })
    // })

    // UPDATE
    // app.put('/actors/:tvShowId', (req, res) => {
    //     const tv = req.body;
    //     ActorsService.update(tv)
    //         .then(tv => res.json(tv))
    // })

}


module.exports = addTvRoutes;