const TwitterService = require('../services/twitter-service')

function addTwitterRoutes(app) {
    app.get('/twitter/:search', (req, res) => {
        const search = req.params.search;
        TwitterService.searchByKeyword(search, function (err, data, reso) {
            var finalRes = []
            // var finalFinal = []
            // return res.send(data.statuses)
            // data.statuses.forEach(obj=>finalRes.push(obj.entities.user_mentions[0]))
            // finalRes.forEach(obj=>finalFinal.push(finalRes.id))
            data.statuses.map(obj => obj.entities.user_mentions.filter(arr => arr.id)).forEach(arr => (arr.forEach(arr => finalRes.push(arr.id))))
            res.send(finalRes)
        }


        )
    })
}


module.exports = addTwitterRoutes;

