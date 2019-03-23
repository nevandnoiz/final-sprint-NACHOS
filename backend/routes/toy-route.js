const toyService = require('../services/toy-service')

function addToyRoutes(app) {

    // LIST
    app.get('/toy', (req, res) => {
        toyService.query()
            .then(toys => res.json(toys))
    })

    // SINGLE - GET Full details including reviews
    app.get('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        toyService.getById(toyId)
            .then(toy => res.json(toy))
    })

    // DELETE
    app.delete('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end(`Toy ${toyId} Deleted `))
    })

    // CREATE
    app.post('/toy', (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => {
                res.json(toy)
            })
    })

    // UPDATE
    app.put('/toy/:toyId', (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
    })

}


module.exports = addToyRoutes;