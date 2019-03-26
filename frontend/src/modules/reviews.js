import ReviewsService from '../services/ReviewsService.js';

export default {
    state: {
        currItemReviews: [],
    },
    getters: {
        currItemReviews(state) {
            return state.currItemReviews
        },
        // selectedMovie(state) {
        //   return state.selectedMovie
        // }
    },
    mutations: {
        setCurrItemReviews(state, reviews) {
            state.currItemReviews = reviews
        },
        addReview(state, { newReview }) {
            state.currItemReviews.push(newReview)
        },
        // setSelectedMovie(state, movie) {
        //   state.selectedMovie = movie
        // }
    },
    actions: {
        async loadReviewsByType(context, { itemType, itemId }) {
            const reviews = await ReviewsService.loadReviewsByType(itemType, itemId)
            context.commit('setCurrItemReviews', reviews)
            return reviews
        },
        async addReview(context, { newReview, itemType, itemId }) {
            const reviews = await ReviewsService.addReview(newReview, itemType, itemId)
            context.commit({ type: 'addReview', newReview })
        },
    }
}