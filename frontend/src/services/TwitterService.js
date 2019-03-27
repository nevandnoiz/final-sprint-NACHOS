import axios from 'axios'
export default {
    seachTwitter
}
async function seachTwitter(keyword) {
    let res = await axios.get(`http://localhost:3003/twitter/${keyword}`)
    const searchRes = res.data
    return searchRes
}
