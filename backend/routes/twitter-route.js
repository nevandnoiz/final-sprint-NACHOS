const TwitterService = require('../services/twitter-service')

function addTwitterRoutes(app) {
    app.get('/twitter/:search', (req, res) => {
        const search = req.params.search;
        TwitterService.searchByKeyword(search, function (err, data, reso) {
            res.send(data.statuses.map(obj=>obj.id_str))
        }
        )
    })
}


module.exports = addTwitterRoutes;

