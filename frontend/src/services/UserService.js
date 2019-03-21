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
        item_id: 166428,
        itemTitle: "How to Train Your Dragon: The Hidden World",
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
                items: null
            },
            {
                name: 'watchList',
                items: [
                    { "vote_count": 1065, "id": 166428, "video": false, "vote_average": 7.8, "title": "How to Train Your Dragon: The Hidden World", "popularity": 378.308, "poster_path": "\/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg", "original_language": "en", "original_title": "How to Train Your Dragon: The Hidden World", "genre_ids": [16, 10751, 12], "backdrop_path": "\/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg", "adult": false, "overview": "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.", "release_date": "2019-01-03" },
                    { "vote_count": 74, "id": 450001, "video": false, "vote_average": 5.5, "title": "Master Z: Ip Man Legacy", "popularity": 324.002, "poster_path": "\/2WfjB6FUDTIBVI2y02UGbnHR82s.jpg", "original_language": "cn", "original_title": "葉問外傳：張天志", "genre_ids": [28], "backdrop_path": "\/grtVFGJ4ts0nDAPpc1JWbBoVKTu.jpg", "adult": false, "overview": "After being defeated by Ip Man, Cheung Tin Chi is attempting to keep a low profile. While going about his business, he gets into a fight with a foreigner by the name of Davidson, who is a big boss behind the bar district. Tin Chi fights hard with Wing Chun and earns respect.", "release_date": "2018-12-20" }
                ]
            },
        ],
        userActivities: []
    }
}