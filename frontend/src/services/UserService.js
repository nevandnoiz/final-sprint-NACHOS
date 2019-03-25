import axios from 'axios'

export default {
    getActivities,
    getUser
}

const users = []
const activities = [
    {
        _id: 'abc321321',
        byUser: {
            Name: {
                firstName: 'tal',
                lastName: 'wiener'
            }, _id: 'abc123'
        },
        item_id: 79501,
        item_type: 'tv',
        itemTitle: "Doom Patrol",
        Type: 'rate',
        value: 5,
    }
]


function getActivities() {
    return activities
}


function getUser() {
    return {
        _id: 'abc123',
        password: '123123',
        name: {
            firstName: 'tal',
            lastName: 'wiener'
        },
        mail: null,
        img: null,
        following: null,
        lists: [
            {
                name: 'favorites',
                items: []
            },
            {
                name: 'watchList',
                items: [
                    { "vote_count": 1065, "id": 166428, "video": false, "vote_average": 7.8, "title": "How to Train Your Dragon: The Hidden World", "popularity": 378.308, "poster_path": "\/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg", "original_language": "en", "original_title": "How to Train Your Dragon: The Hidden World", "genre_ids": [16, 10751, 12], "backdrop_path": "\/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg", "adult": false, "overview": "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.", "release_date": "2019-01-03" },
                    { "vote_count": 74, "id": 450001, "video": false, "vote_average": 5.5, "title": "Master Z: Ip Man Legacy", "popularity": 324.002, "poster_path": "\/2WfjB6FUDTIBVI2y02UGbnHR82s.jpg", "original_language": "cn", "original_title": "葉問外傳：張天志", "genre_ids": [28], "backdrop_path": "\/grtVFGJ4ts0nDAPpc1JWbBoVKTu.jpg", "adult": false, "overview": "After being defeated by Ip Man, Cheung Tin Chi is attempting to keep a low profile. While going about his business, he gets into a fight with a foreigner by the name of Davidson, who is a big boss behind the bar district. Tin Chi fights hard with Wing Chun and earns respect.", "release_date": "2018-12-20" },
                    { "air_date": "2016-05-29", "crew": [{ "id": 28976, "credit_id": "56f8b037c3a36816e8008643", "name": "Jack Bender", "department": "Directing", "job": "Director", "gender": 2, "profile_path": "/w76R8JljkSFmbqb3DRs3EK4AJwW.jpg" }, { "id": 1223784, "credit_id": "5256c8a419c2956ff6046f62", "name": "Bryan Cogman", "department": "Writing", "job": "Writer", "gender": 0, "profile_path": null }, { "id": 2074898, "credit_id": "5b3696d70e0a26400802e272", "name": "Mark Taylor", "department": "Directing", "job": "First Assistant Director", "gender": 2, "profile_path": null }], "episode_number": 6, "guest_stars": [{ "id": 213395, "name": "Hannah Murray", "credit_id": "55181024c3a36862ff00406c", "character": "Gilly", "order": 20, "gender": 1, "profile_path": "/9Qob0EzmUG8WuM5XmkD0mN2ZJUp.jpg" }, { "id": 220290, "name": "Ellie Kendrick", "credit_id": "57017589c3a368568c00077b", "character": "Meera Reed", "order": 21, "gender": 1, "profile_path": "/xggl7GihLGxqyd1i8lPL5Aj5qp2.jpg" }, { "id": 10168, "name": "Diana Rigg", "credit_id": "570174fcc3a3685688000676", "character": "Olenna Tyrell", "order": 24, "gender": 1, "profile_path": "/uE6T555B1BtlKqemVLVjM4XcUC5.jpg" }, { "id": 33449, "name": "Essie Davis", "credit_id": "574e5fe2c3a36801340011dd", "character": "Lady Crane", "order": 31, "gender": 1, "profile_path": "/4fRr8V4harQBxJCvR8dhPP40tYA.jpg" }, { "id": 20766, "name": "Richard E. Grant", "credit_id": "574e6020c3a36801340011ea", "character": "Izembaro", "order": 32, "gender": 2, "profile_path": "/6UXv8E4WWvRCKMQx1FQ0FJVyu0a.jpg" }, { "id": 1629234, "name": "Rob Callender", "credit_id": "574e605292514113ba0010b6", "character": "Clarenzo", "order": 33, "gender": 0, "profile_path": "/uSPMw13prQl5UwJPpYRj5MjzpD5.jpg" }, { "id": 9140, "name": "James Faulkner", "credit_id": "574e6067c3a368012e0011cd", "character": "Lord Randyll Tarly", "order": 34, "gender": 2, "profile_path": "/wMDpbctF9cAL5nYnSL6AcXUTG5K.jpg" }, { "id": 10920, "name": "Tobias Menzies", "credit_id": "574e607692514113b8001058", "character": "Lord Edmure Tully", "order": 35, "gender": 2, "profile_path": "/bXUpxFsIowySRyyqchaE1XprptI.jpg" }, { "id": 11180, "name": "David Bradley", "credit_id": "574e6088c3a3680134001206", "character": "Lord Walder Frey", "order": 36, "gender": 2, "profile_path": "/5BPFRv4io7U1zxkYHtKaE9a8FDD.jpg" }, { "id": 1204956, "name": "Faye Marsay", "credit_id": "574e60a892514113cc001118", "character": "The Waif", "order": 37, "gender": 1, "profile_path": "/3cd4rLHr90MRTTx2aD9XkXPrwW9.jpg" }, { "id": 234934, "name": "Freddie Stroma", "credit_id": "574e60e6c3a3687ffb0013de", "character": "Dickon Tarly", "order": 39, "gender": 2, "profile_path": "/vytAeQwkaoSlxAR1CqN2OFLIaxt.jpg" }, { "id": 119783, "name": "Joseph Mawle", "credit_id": "5256c8b919c2956ff604836a", "character": "Benjen Stark", "order": 39, "gender": 2, "profile_path": "/bJVvO7h2OVoboF5H8sTjjnfM8Ov.jpg" }, { "id": 1223789, "name": "Eugene Simon", "credit_id": "5256c8bb19c2956ff60483c8", "character": "Lancel Lannister", "order": 41, "gender": 2, "profile_path": "/wexuGa62EeUdjxCtE0CnKlsHWTk.jpg" }, { "id": 1278487, "name": "Hannah Waddingham", "credit_id": "57b729a8c3a3681408001adc", "character": "Septa Unella", "order": 69, "gender": 1, "profile_path": "/p3riFjduOJvmRRV9lTKTd6zQHpA.jpg" }, { "id": 1503075, "name": "Daniel Tuite", "credit_id": "57b729e2925141389d0020a7", "character": "Lothar Frey", "order": 70, "gender": 0, "profile_path": "/qHXOXGTwNSVxOijzXPkIAWJVlMX.jpg" }, { "id": 62972, "name": "Tim Plester", "credit_id": "57b72a089251412b04002359", "character": "Black Walder Rivers", "order": 71, "gender": 2, "profile_path": "/w2AzIdLAn03XHpWtWdiSjBSCJru.jpg" }, { "id": 1648346, "name": "Robert Aramayo", "credit_id": "57b72a3ac3a3687f590022a3", "character": "Young Ned", "order": 72, "gender": 2, "profile_path": "/oujAy7sYodRpqsoZHpz0jTW8ki8.jpg" }, { "id": 1416396, "name": "Leigh Gill", "credit_id": "57b7489a92514133840006ab", "character": "Bobono", "order": 89, "gender": 0, "profile_path": "/74JrWrbywbuNjHnXujXZ9wXuodV.jpg" }, { "id": 122535, "name": "Samantha Spiro", "credit_id": "57b80aaec3a3684f9400293d", "character": "Melessa Tarly", "order": 96, "gender": 1, "profile_path": "/pD6fS3ZRo0dnUmcNYrDniIu1VEv.jpg" }, { "id": 39185, "name": "Kevin Eldon", "credit_id": "57b80b62c3a368358500a132", "character": "Camello", "order": 97, "gender": 2, "profile_path": "/lNFOatTndUJJjZViYyIaVfBXfjZ.jpg" }, { "id": 1262627, "name": "Eline Powell", "credit_id": "57b80baf9251417bee003a56", "character": "Bianca", "order": 98, "gender": 1, "profile_path": "/uSNpUtmn8HULtwuEPnb3ogx4jcx.jpg" }, { "id": 1668214, "name": "Eva Butterly", "credit_id": "57b80ce69251410e11002f33", "character": "Margaery Tyrell mummer", "order": 99, "gender": 0, "profile_path": null }, { "id": 20243, "name": "Roger Ashton-Griffiths", "credit_id": "570161a7c3a368568c0003ed", "character": "Mace Tyrell", "order": 500, "gender": 2, "profile_path": "/fwVK6FD82EANGLXlAu8ulXZB86q.jpg" }, { "id": 1211852, "name": "Ian Gelder", "credit_id": "5701823092514160720007ea", "character": "Kevan Lannister", "order": 500, "gender": 2, "profile_path": "/j2XFWivkKcMVKrsyyT2CadqR9YL.jpg" }], "name": "Blood of My Blood", "overview": "An old foe comes back into the picture. Gilly meets Sam’s family. Arya faces a difficult choice. Jaime faces off against the High Sparrow.", "id": 1186955, "production_code": "606", "season_number": 6, "still_path": "/k01MUth8Xm2y79nvsQ3UF25SN9w.jpg", "vote_average": 7.606, "vote_count": 52, "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg" }
                ]
            },
        ],
        userActivities: []
    }
}