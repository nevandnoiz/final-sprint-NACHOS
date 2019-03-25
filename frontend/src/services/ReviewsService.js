import axios from 'axios'

export default {
    loadReviewsByType,
    addReview
}

async function loadReviewsByType(type,id){
    let res = await axios.get(`http://localhost:3003/reviews/${type}/${id}`)
    const reviews = res.data
    return reviews
}

function addReview(newReview,type,id) {
    console.log(newReview,type,id)
    return axios.post(`http://localhost:3003/reviews/${type}/${id}`, newReview)
}