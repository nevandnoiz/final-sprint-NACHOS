import axios from 'axios'

export default {
    loadReviewsByType,
    addReview
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003';

async function loadReviewsByType(type,id){
    let res = await axios.get(`${BASE_URL}/${type}/reviews/${id}`)
    const reviews = res.data
    return reviews
}

function addReview(newReview,type,id) {
    return axios.post(`${BASE_URL}/${type}/reviews/${id}`, newReview)
}