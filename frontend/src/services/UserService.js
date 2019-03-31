import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true
})
import util from '../services/UtilityService.js'

export default {
    getFollowedActivities,
    loginUser,
    loadUser,
    addLikeToActivity,
    addCommentToActivity,
    addToListByType,
    removeFromListByType,
    addActivityByType,
    markWatched,
    unmarkWatched,
    removeLikeToActivity
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3003';

const users = []

// const activities = [
//     {
//         _id: 'abc321321',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Eyal',
//                 lastName: 'wiener'
//             }, _id: 'abc123'
//         },
//         item_id: 79501,
//         item_type: 'tv',
//         itemTitle: "Doom Patrol",
//         type: 'activity',
//         activity: 'rate',
//         value: 5,
//         comments: [],
//         likes: 7
//     },
//     {
//         _id: 'abc321356',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Yaniv',
//                 lastName: 'wiener'
//             }, _id: '987agv'
//         },
//         item_id: 324857,
//         item_type: 'movies',
//         itemTitle: "Spider-Man: Into the Spider-Verse",
//         type: 'activity',
//         activity: 'listAdd',
//         value: 'Favorite',
//         comments: [],
//         likes: 0
//     },
//     {
//         _id: '098765456',
//         timestamp: null,
//         byUser: {
//             name: {
//                 firstName: 'Yaniv',
//                 lastName: 'wiener'
//             }, _id: '987agv'
//         },
//         item_id: 1399,
//         item_type: 'tv',
//         itemTitle: "Game Of Thrones",
//         type: 'activity',
//         activity: 'listAdd',
//         value: 'watchList',
//         comments: [],
//         likes: 0
//     }
// ]

async function getFollowedActivities(userId, following) {
    let prms = []
    following.forEach(followed => {
        let followedId = followed._id
        prms.push(axios.get(`${BASE_URL}/user/${userId}/activities/${followedId}`))
    })
    let res = await Promise.all(prms)
    let acitivites = res.map(activity => activity.data)
    return acitivites.flat()
}

function addLikeToActivity(activity) {
    const newActivity = util.deepCopy(activity)
    newActivity.likes++
    //TODO: replace the activty in the server for the user
    return newActivity // return the new obj from the server after update succes
}
function removeLikeToActivity(activity) {
    const newActivity = util.deepCopy(activity)
    newActivity.likes--
    //TODO: replace the activty in the server for the user
    return newActivity // return the new obj from the server after update succes
}

function addToListByType(addedItem, userId, listType) {
    return axios.post(`${BASE_URL}/user/${userId}/lists/${listType}`, addedItem)
}

function removeFromListByType(itemId, userId, listType) {
    return axios.delete(`${BASE_URL}/user/${userId}/lists/${listType}/${itemId}`)
}

function markWatched(userId, showId, epId) {
    return axios.post(`${BASE_URL}/user/${userId}/episodes/${showId}`, { epId })
}

function unmarkWatched(userId, showId, epId) {
    return axios.delete(`${BASE_URL}/user/${userId}/episodes/${showId}/${epId}`)
}

function addActivityByType(user, item, itemType, activityType, value) {
    let activity = _createActivity(user, item, itemType, activityType, value)
    return axios.post(`${BASE_URL}/user/${user._id}/activities`, activity)
}

function addCommentToActivity(comment, activity) {
    let userId = comment.user._id
    let newActivity = util.deepCopy(activity)
    newActivity.comments.push(comment)
    return axios.put(`${BASE_URL}/user/${userId}/activities/comment`, newActivity)
    //TODO: replace the activty in the server for the user
    // return newActivity // return the new obj from the server after update succes
}
function loginUser() {
    let user = { email: 'email@wiener.tal', password: '123123' }
    return axios.post(`${BASE_URL}/login`,
        user
    )
        .then(res => res.data)
}

function loadUser() {
    return axios.get(`${BASE_URL}/login`,
    )
        .then(res => {
            return res.data
        })
}

function _createActivity(user, item, itemType, activityType, value) {
    return {
        timestamp: Date.now(),
        byUser: {
            name: {
                firstName: user.name.firstName,
                lastName: user.name.lastName,
            },
            _id: user._id
        },
        item_id: item.id,
        item_type: itemType,
        itemTitle: (item.title) ? item.title : item.name,
        type: 'activity',
        activity: activityType,
        value: value,
        comments: [],
        likes: 0
    }
}




// function getUser() {
//     return {
//         id: 'abc123',
//         password: '123123',
//         name: {
//             firstName: 'tal',
//             lastName: 'wiener'
//         },
//         email: 'email@wiener.tal',
//         img: null,
//         following: [],

// user={id:123,lists:[{name:favorites,lists:[{},{},{}]},{name:watchlist,list:[{},{}]}]}
//         lists: [
//             {
//                 name: 'favorites',
//                 items: [
//                     { "backdrop_path": "/xVzvD5BPAU4HpleFSo8QOdHkndo.jpg", "created_by": [{ "id": 4027, "credit_id": "5256cb3f19c2956ff605e5de", "name": "Frank Darabont", "gender": 2, "profile_path": "/9KVvZtDyy8DXacw2TTsjC9VLxQi.jpg" }], "episode_run_time": [42, 60, 45], "first_air_date": "2010-10-31", "genres": [{ "id": 10759, "name": "Action & Adventure" }, { "id": 18, "name": "Drama" }, { "id": 10765, "name": "Sci-Fi & Fantasy" }], "homepage": "http://www.amctv.com/shows/the-walking-dead/", "id": 1402, "in_production": true, "languages": ["en"], "last_air_date": "2019-03-24", "last_episode_to_air": { "air_date": "2019-03-24", "episode_number": 15, "id": 1628154, "name": "The Calm Before", "overview": "", "production_code": "", "season_number": 9, "show_id": 1402, "still_path": "/jKDvLdxkN5VO2AXsUnjeka0a0Qv.jpg", "vote_average": 0, "vote_count": 0 }, "name": "The Walking Dead", "next_episode_to_air": { "air_date": "2019-03-31", "episode_number": 16, "id": 1628155, "name": "The Storm", "overview": "", "production_code": "", "season_number": 9, "show_id": 1402, "still_path": null, "vote_average": 0, "vote_count": 0 }, "networks": [{ "name": "AMC", "id": 174, "logo_path": "/pmvRmATOCaDykE6JrVoeYxlFHw3.png", "origin_country": "US" }], "number_of_episodes": 131, "number_of_seasons": 9, "origin_country": ["US"], "original_language": "en", "original_name": "The Walking Dead", "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.", "popularity": 157.024, "poster_path": "/bjU4tLlyp8W4yTB0Hqn8J1IDUnD.jpg", "production_companies": [{ "id": 23242, "logo_path": "/fOALFvgnO1ZdIaA9PNIAAuaDKWd.png", "name": "AMC Networks", "origin_country": "US" }, { "id": 4854, "logo_path": null, "name": "American Movie Classics (AMC)", "origin_country": "" }, { "id": 23921, "logo_path": "/simDvqT8y6jhP530ggUMbikvVKc.png", "name": "Circle of Confusion", "origin_country": "US" }, { "id": 11533, "logo_path": "/tWM9pmzVYxok4GbQIttxdcml1yT.png", "name": "Valhalla Motion Pictures", "origin_country": "US" }, { "id": 3982, "logo_path": null, "name": "Darkwoods Productions", "origin_country": "US" }], "seasons": [{ "air_date": "2010-10-11", "episode_count": 43, "id": 3646, "name": "Specials", "overview": "", "poster_path": "/dJ8jOjIwgG6CybD4X5rTunO4cZ6.jpg", "season_number": 0 }, { "air_date": "2010-10-31", "episode_count": 6, "id": 3643, "name": "Season 1", "overview": "", "poster_path": "/yaOB2Y8GcoXwjNQ3apq67bMbNHF.jpg", "season_number": 1 }, { "air_date": "2011-10-16", "episode_count": 13, "id": 3644, "name": "Season 2", "overview": "", "poster_path": "/wpG9SDyz23t3vU8dTbtSvEkxv8r.jpg", "season_number": 2 }, { "air_date": "2012-10-14", "episode_count": 16, "id": 3645, "name": "Season 3", "overview": "", "poster_path": "/mDVPeQ5ZaaeO2Qh7VlXZchHHuLN.jpg", "season_number": 3 }, { "air_date": "2013-10-13", "episode_count": 16, "id": 3647, "name": "Season 4", "overview": "", "poster_path": "/pLXlKKQOoUZAjWsXwacZCj6SWIb.jpg", "season_number": 4 }, { "air_date": "2014-10-12", "episode_count": 16, "id": 60391, "name": "Season 5", "overview": "After the season 4 finale left most of the main characters at the mercy of the sadistic inhabitants of Terminus. Season 5 will offer new directions for the group of survivors as scientist Eugene Porter promises a cure to the zombie virus if he can be safely escorted to Washington DC, but getting there is easier said than done.", "poster_path": "/oiQbg5WqdHqBWMrtbzJeS6vb2Lt.jpg", "season_number": 5 }, { "air_date": "2015-10-11", "episode_count": 16, "id": 68814, "name": "Season 6", "overview": "With no hope of safety in Alexandria, Rick's group is forced to resume their precarious fight for survival. In the fight for humanity, many have become inhumane. While the Alexandrians must adapt to the hardness of Rick's group, Rick's group must retreat from their violent ways. This won't happen easily, but now there is more at stake than simply surviving. Rick's group is fighting for a chance at normalcy in a world of chaos.", "poster_path": "/kwVAeAA6TlZWr6lRP2yVTyR2aif.jpg", "season_number": 6 }, { "air_date": "2016-10-23", "episode_count": 16, "id": 76834, "name": "Season 7", "overview": "Rick and his group's world becomes even more brutal due to Negan's deadly example of what happens if they don't live under his rules. Everyone must begin again.", "poster_path": "/nO2rbewsaek4J1M6sN3PsS5Sf2C.jpg", "season_number": 7 }, { "air_date": "2017-10-22", "episode_count": 16, "id": 91735, "name": "Season 8", "overview": "Rick and his survivors bring \"All-Out War\" to Negan and his forces. The Saviors are larger, better-equipped, and ruthless - but Rick and the unified communities are fighting for the promise of a brighter future. The battle lines are drawn as they launch into a kinetic, action-packed offensive.", "poster_path": "/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg", "season_number": 8 }, { "air_date": "2018-10-07", "episode_count": 16, "id": 109531, "name": "Season 9", "overview": "", "poster_path": "/5KKovNGmh20sDBnyFyuaYTOSmh8.jpg", "season_number": 9 }], "status": "Returning Series", "type": "Scripted", "vote_average": 7.3, "vote_count": 4055 },
//                     { "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg", "created_by": [{ "id": 9813, "credit_id": "5256c8c219c2956ff604858a", "name": "David Benioff", "gender": 2, "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg" }, { "id": 228068, "credit_id": "552e611e9251413fea000901", "name": "D. B. Weiss", "gender": 2, "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg" }], "episode_run_time": [60], "first_air_date": "2011-04-17", "genres": [{ "id": 10765, "name": "Sci-Fi & Fantasy" }, { "id": 18, "name": "Drama" }, { "id": 10759, "name": "Action & Adventure" }], "homepage": "http://www.hbo.com/game-of-thrones", "id": 1399, "in_production": true, "languages": ["es", "en", "de"], "last_air_date": "2017-08-27", "last_episode_to_air": { "air_date": "2017-08-27", "episode_number": 7, "id": 1340528, "name": "The Dragon and the Wolf", "overview": "A meeting is held in King's Landing. Problems arise in the North.", "production_code": "707", "season_number": 7, "show_id": 1399, "still_path": "/jLe9VcbGRDUJeuM8IwB7VX4GDRg.jpg", "vote_average": 9.011, "vote_count": 46 }, "name": "Game of Thrones", "next_episode_to_air": { "air_date": "2019-04-14", "episode_number": 1, "id": 1551825, "name": "Episode 1", "overview": "", "production_code": "", "season_number": 8, "show_id": 1399, "still_path": null, "vote_average": 8, "vote_count": 1 }, "networks": [{ "name": "HBO", "id": 49, "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png", "origin_country": "US" }], "number_of_episodes": 73, "number_of_seasons": 8, "origin_country": ["US"], "original_language": "en", "original_name": "Game of Thrones", "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.", "popularity": 238.778, "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg", "production_companies": [{ "id": 76043, "logo_path": "/9RO2vbQ67otPrBLXCaC8UMp3Qat.png", "name": "Revolution Sun Studios", "origin_country": "US" }, { "id": 3268, "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png", "name": "HBO", "origin_country": "US" }, { "id": 12525, "logo_path": null, "name": "Television 360", "origin_country": "" }, { "id": 5820, "logo_path": null, "name": "Generator Entertainment", "origin_country": "" }, { "id": 12526, "logo_path": null, "name": "Bighead Littlehead", "origin_country": "" }], "seasons": [{ "air_date": "2010-12-05", "episode_count": 15, "id": 3627, "name": "Specials", "overview": "", "poster_path": "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg", "season_number": 0 }, { "air_date": "2011-04-17", "episode_count": 10, "id": 3624, "name": "Season 1", "overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.", "poster_path": "/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg", "season_number": 1 }, { "air_date": "2012-04-01", "episode_count": 10, "id": 3625, "name": "Season 2", "overview": "The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.", "poster_path": "/5tuhCkqPOT20XPwwi9NhFnC1g9R.jpg", "season_number": 2 }, { "air_date": "2013-03-31", "episode_count": 10, "id": 3626, "name": "Season 3", "overview": "Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.", "poster_path": "/7d3vRgbmnrRQ39Qmzd66bQyY7Is.jpg", "season_number": 3 }, { "air_date": "2014-04-06", "episode_count": 10, "id": 3628, "name": "Season 4", "overview": "The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.", "poster_path": "/dniQ7zw3mbLJkd1U0gdFEh4b24O.jpg", "season_number": 4 }, { "air_date": "2015-04-12", "episode_count": 10, "id": 62090, "name": "Season 5", "overview": "The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.", "poster_path": "/527sR9hNDcgVDKNUE3QYra95vP5.jpg", "season_number": 5 }, { "air_date": "2016-04-24", "episode_count": 10, "id": 71881, "name": "Season 6", "overview": "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.", "poster_path": "/zvYrzLMfPIenxoq2jFY4eExbRv8.jpg", "season_number": 6 }, { "air_date": "2017-07-15", "episode_count": 7, "id": 81266, "name": "Season 7", "overview": "The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.", "poster_path": "/3dqzU3F3dZpAripEx9kRnijXbOj.jpg", "season_number": 7 }, { "air_date": "2019-04-13", "episode_count": 6, "id": 107971, "name": "Season 8", "overview": null, "poster_path": "/aJ8Bkb8Fck3sk5UIGGWGAkRiznC.jpg", "season_number": 8 }], "status": "Returning Series", "type": "Scripted", "vote_average": 8.2, "vote_count": 5426 },
//                     { "backdrop_path": "/eceERFCjdYEDPDQpVBreukypTI8.jpg", "created_by": [{ "id": 222330, "credit_id": "584f423cc3a36831ce001187", "name": "Brit Marling", "gender": 1, "profile_path": "/4OLcUgDjBlEumPdrWf9c78JSwDr.jpg" }, { "id": 933739, "credit_id": "584f424bc3a3682f58001152", "name": "Zal Batmanglij", "gender": 2, "profile_path": "/kkDU7v5eDZTWbRIoPsRYT3AdcoG.jpg" }], "episode_run_time": [60], "first_air_date": "2016-12-16", "genres": [{ "id": 10765, "name": "Sci-Fi & Fantasy" }, { "id": 9648, "name": "Mystery" }, { "id": 18, "name": "Drama" }], "homepage": "https://www.netflix.com/title/80044950", "id": 69061, "in_production": true, "languages": ["en"], "last_air_date": "2019-03-22", "last_episode_to_air": { "air_date": "2019-03-22", "episode_number": 8, "id": 1722343, "name": "Overview", "overview": "While BBA and the others converge on the clinic, Nina persuades Hap to show her his research, and Karim unlocks one of the house's final secrets.", "production_code": "", "season_number": 2, "show_id": 69061, "still_path": "/4GnqkTkBMgWaQ2nMtZI6uiw8Kcv.jpg", "vote_average": 10, "vote_count": 1 }, "name": "The OA", "next_episode_to_air": null, "networks": [{ "name": "Netflix", "id": 213, "logo_path": "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png", "origin_country": "" }], "number_of_episodes": 16, "number_of_seasons": 2, "origin_country": [], "original_language": "en", "original_name": "The OA", "overview": "Prairie Johnson, blind as a child, comes home to the community she grew up in with her sight restored. Some hail her a miracle, others a dangerous mystery, but Prairie won’t talk with the FBI or her parents about the seven years she went missing.", "popularity": 66.591, "poster_path": "/rueY4slMeKtTGitm0raFUJvgaa5.jpg", "production_companies": [{ "id": 81, "logo_path": "/8wOfUhA7vwU2gbPjQy7Vv3EiF0o.png", "name": "Plan B Entertainment", "origin_country": "US" }, { "id": 10039, "logo_path": "/b8w4LldQolMKiLZw4FQJBcXSDGI.png", "name": "Anonymous Content", "origin_country": "US" }], "seasons": [{ "air_date": "2016-12-16", "episode_count": 8, "id": 82773, "name": "Season 1", "overview": "", "poster_path": "/mUtZ3a6b6xLhUWcLjJxFGqo1Hom.jpg", "season_number": 1 }, { "air_date": "2019-03-22", "episode_count": 8, "id": 119554, "name": "Season 2", "overview": "", "poster_path": "/tTPu0drneFbUPswym2pXbKNZrO3.jpg", "season_number": 2 }], "status": "Returning Series", "type": "Scripted", "vote_average": 7.4, "vote_count": 293 }
//                 ]
//             },
//             {
//                 name: 'watchList',
//                 items: [
//                     { "vote_count": 1065, "id": 166428, "video": false, "vote_average": 7.8, "title": "How to Train Your Dragon: The Hidden World", "popularity": 378.308, "poster_path": "\/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg", "original_language": "en", "original_title": "How to Train Your Dragon: The Hidden World", "genre_ids": [16, 10751, 12], "backdrop_path": "\/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg", "adult": false, "overview": "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.", "release_date": "2019-01-03" },
//                     { "vote_count": 74, "id": 450001, "video": false, "vote_average": 5.5, "title": "Master Z: Ip Man Legacy", "popularity": 324.002, "poster_path": "\/2WfjB6FUDTIBVI2y02UGbnHR82s.jpg", "original_language": "cn", "original_title": "葉問外傳：張天志", "genre_ids": [28], "backdrop_path": "\/grtVFGJ4ts0nDAPpc1JWbBoVKTu.jpg", "adult": false, "overview": "After being defeated by Ip Man, Cheung Tin Chi is attempting to keep a low profile. While going about his business, he gets into a fight with a foreigner by the name of Davidson, who is a big boss behind the bar district. Tin Chi fights hard with Wing Chun and earns respect.", "release_date": "2018-12-20" },
//                     { "air_date": "2016-05-29", "crew": [{ "id": 28976, "credit_id": "56f8b037c3a36816e8008643", "name": "Jack Bender", "department": "Directing", "job": "Director", "gender": 2, "profile_path": "/w76R8JljkSFmbqb3DRs3EK4AJwW.jpg" }, { "id": 1223784, "credit_id": "5256c8a419c2956ff6046f62", "name": "Bryan Cogman", "department": "Writing", "job": "Writer", "gender": 0, "profile_path": null }, { "id": 2074898, "credit_id": "5b3696d70e0a26400802e272", "name": "Mark Taylor", "department": "Directing", "job": "First Assistant Director", "gender": 2, "profile_path": null }], "episode_number": 6, "guest_stars": [{ "id": 213395, "name": "Hannah Murray", "credit_id": "55181024c3a36862ff00406c", "character": "Gilly", "order": 20, "gender": 1, "profile_path": "/9Qob0EzmUG8WuM5XmkD0mN2ZJUp.jpg" }, { "id": 220290, "name": "Ellie Kendrick", "credit_id": "57017589c3a368568c00077b", "character": "Meera Reed", "order": 21, "gender": 1, "profile_path": "/xggl7GihLGxqyd1i8lPL5Aj5qp2.jpg" }, { "id": 10168, "name": "Diana Rigg", "credit_id": "570174fcc3a3685688000676", "character": "Olenna Tyrell", "order": 24, "gender": 1, "profile_path": "/uE6T555B1BtlKqemVLVjM4XcUC5.jpg" }, { "id": 33449, "name": "Essie Davis", "credit_id": "574e5fe2c3a36801340011dd", "character": "Lady Crane", "order": 31, "gender": 1, "profile_path": "/4fRr8V4harQBxJCvR8dhPP40tYA.jpg" }, { "id": 20766, "name": "Richard E. Grant", "credit_id": "574e6020c3a36801340011ea", "character": "Izembaro", "order": 32, "gender": 2, "profile_path": "/6UXv8E4WWvRCKMQx1FQ0FJVyu0a.jpg" }, { "id": 1629234, "name": "Rob Callender", "credit_id": "574e605292514113ba0010b6", "character": "Clarenzo", "order": 33, "gender": 0, "profile_path": "/uSPMw13prQl5UwJPpYRj5MjzpD5.jpg" }, { "id": 9140, "name": "James Faulkner", "credit_id": "574e6067c3a368012e0011cd", "character": "Lord Randyll Tarly", "order": 34, "gender": 2, "profile_path": "/wMDpbctF9cAL5nYnSL6AcXUTG5K.jpg" }, { "id": 10920, "name": "Tobias Menzies", "credit_id": "574e607692514113b8001058", "character": "Lord Edmure Tully", "order": 35, "gender": 2, "profile_path": "/bXUpxFsIowySRyyqchaE1XprptI.jpg" }, { "id": 11180, "name": "David Bradley", "credit_id": "574e6088c3a3680134001206", "character": "Lord Walder Frey", "order": 36, "gender": 2, "profile_path": "/5BPFRv4io7U1zxkYHtKaE9a8FDD.jpg" }, { "id": 1204956, "name": "Faye Marsay", "credit_id": "574e60a892514113cc001118", "character": "The Waif", "order": 37, "gender": 1, "profile_path": "/3cd4rLHr90MRTTx2aD9XkXPrwW9.jpg" }, { "id": 234934, "name": "Freddie Stroma", "credit_id": "574e60e6c3a3687ffb0013de", "character": "Dickon Tarly", "order": 39, "gender": 2, "profile_path": "/vytAeQwkaoSlxAR1CqN2OFLIaxt.jpg" }, { "id": 119783, "name": "Joseph Mawle", "credit_id": "5256c8b919c2956ff604836a", "character": "Benjen Stark", "order": 39, "gender": 2, "profile_path": "/bJVvO7h2OVoboF5H8sTjjnfM8Ov.jpg" }, { "id": 1223789, "name": "Eugene Simon", "credit_id": "5256c8bb19c2956ff60483c8", "character": "Lancel Lannister", "order": 41, "gender": 2, "profile_path": "/wexuGa62EeUdjxCtE0CnKlsHWTk.jpg" }, { "id": 1278487, "name": "Hannah Waddingham", "credit_id": "57b729a8c3a3681408001adc", "character": "Septa Unella", "order": 69, "gender": 1, "profile_path": "/p3riFjduOJvmRRV9lTKTd6zQHpA.jpg" }, { "id": 1503075, "name": "Daniel Tuite", "credit_id": "57b729e2925141389d0020a7", "character": "Lothar Frey", "order": 70, "gender": 0, "profile_path": "/qHXOXGTwNSVxOijzXPkIAWJVlMX.jpg" }, { "id": 62972, "name": "Tim Plester", "credit_id": "57b72a089251412b04002359", "character": "Black Walder Rivers", "order": 71, "gender": 2, "profile_path": "/w2AzIdLAn03XHpWtWdiSjBSCJru.jpg" }, { "id": 1648346, "name": "Robert Aramayo", "credit_id": "57b72a3ac3a3687f590022a3", "character": "Young Ned", "order": 72, "gender": 2, "profile_path": "/oujAy7sYodRpqsoZHpz0jTW8ki8.jpg" }, { "id": 1416396, "name": "Leigh Gill", "credit_id": "57b7489a92514133840006ab", "character": "Bobono", "order": 89, "gender": 0, "profile_path": "/74JrWrbywbuNjHnXujXZ9wXuodV.jpg" }, { "id": 122535, "name": "Samantha Spiro", "credit_id": "57b80aaec3a3684f9400293d", "character": "Melessa Tarly", "order": 96, "gender": 1, "profile_path": "/pD6fS3ZRo0dnUmcNYrDniIu1VEv.jpg" }, { "id": 39185, "name": "Kevin Eldon", "credit_id": "57b80b62c3a368358500a132", "character": "Camello", "order": 97, "gender": 2, "profile_path": "/lNFOatTndUJJjZViYyIaVfBXfjZ.jpg" }, { "id": 1262627, "name": "Eline Powell", "credit_id": "57b80baf9251417bee003a56", "character": "Bianca", "order": 98, "gender": 1, "profile_path": "/uSNpUtmn8HULtwuEPnb3ogx4jcx.jpg" }, { "id": 1668214, "name": "Eva Butterly", "credit_id": "57b80ce69251410e11002f33", "character": "Margaery Tyrell mummer", "order": 99, "gender": 0, "profile_path": null }, { "id": 20243, "name": "Roger Ashton-Griffiths", "credit_id": "570161a7c3a368568c0003ed", "character": "Mace Tyrell", "order": 500, "gender": 2, "profile_path": "/fwVK6FD82EANGLXlAu8ulXZB86q.jpg" }, { "id": 1211852, "name": "Ian Gelder", "credit_id": "5701823092514160720007ea", "character": "Kevan Lannister", "order": 500, "gender": 2, "profile_path": "/j2XFWivkKcMVKrsyyT2CadqR9YL.jpg" }], "name": "Blood of My Blood", "overview": "An old foe comes back into the picture. Gilly meets Sam’s family. Arya faces a difficult choice. Jaime faces off against the High Sparrow.", "id": 1186955, "production_code": "606", "season_number": 6, "still_path": "/k01MUth8Xm2y79nvsQ3UF25SN9w.jpg", "vote_average": 7.606, "vote_count": 52, "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg" }
//                 ]
//             },
//         ],
//         userActivities: []
//     }
// }
