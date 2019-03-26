const Twit = require('twit-promise')
const config = require('config')
var bot = new Twit(config)
module.exports = {
    searchByKeyword,
}

// exports.searchByKeyword = function(query, callback){
//     bot.get('search/tweets', {
//       q: query
//       , since: '2016-02-01'
//       , result_type: 'popular'
//       , count: 1
//     }, gotData);
// };

var params = {
    q: 'banana',
    count: 100
}
var T = new Twit(config)


function searchByKeyword(keyword,cb) {

    var params = {
        q: keyword,
        count: 20
    }
   bot.get('search/tweets', params, cb)

}

function gotData(err, data, res){
    // console.log(data)
    // return data
    var test = new Promise(function(reso,rej){
        reso(data)
    })
    // console.log(test)
    // return test
}
