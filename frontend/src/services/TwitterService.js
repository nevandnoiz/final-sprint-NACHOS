import axios from 'axios'
export default {
    seachTwitter
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003';

async function seachTwitter(keyword) {
    let res = await axios.get(`${BASE_URL}/twitter/${keyword}`)
    const searchRes = res.data
    return searchRes
}
