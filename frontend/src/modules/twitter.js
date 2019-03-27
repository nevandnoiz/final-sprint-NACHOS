import TwitterService from '../services/TwitterService.js';
export default {

    actions: {
        async getSeachTwitter(context, keyword) {
            const movieDetails = await TwitterService.seachTwitter(keyword)
            return movieDetails
        },
    }

}
