const Twit = require('twit-promise')
const config = require('../config')
const T = new Twit(config)
module.exports = {
    searchByKeyword,
}

function searchByKeyword(keyword, cb) {
    var params = {
        q: keyword,
        count: 10
    }
    T.get('search/tweets', params, cb)
}
