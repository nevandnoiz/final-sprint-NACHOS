const ReviewsService = require('../services/reviews-service')

function addReviewsRoutes(app) {
    app.get('/reviews/:type/:id', (req, res) => {
        const itemType = req.params.type
        const itemId = req.params.id
        let reviews = ReviewsService.getSelectedItemReviews(itemType, itemId)
        res.send(reviews)
        // .then(reviews => res.send(reviews))
    })
    app.post('/reviews/:type/:id', (req, res) => {
        const itemType = req.params.type
        const itemId = req.params.id
        const newReview = req.body
        console.log(newReview)
       ReviewsService.addReview(newReview,itemType, itemId)
        res.send('great')
        // .then(reviews => res.send(reviews))
    })
}


module.exports = addReviewsRoutes;