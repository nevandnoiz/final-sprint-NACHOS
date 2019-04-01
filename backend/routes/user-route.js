const session = require('express-session')

const userService = require('../services/user-service')
// const reviewService = require('../services/review-service')
const BASE = '/user'

function addRoutes(app) {

    app.use(session({
        secret: 'puki muki',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    app.get(BASE, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })
    app.get(`${BASE}/:id`, (req, res) => {
        const userId = req.params.id
        Promise.all([
            userService.getById(userId),
            reviewService.query({ userId })
        ])
            .then(([user, reviews]) => {
                res.json({ user, reviews })
            })
    })

    app.post('/signup', (req, res) => {
        const nickname = req.body.nickname
        userService.addUser({ nickname })
            .then(user => res.json(user))
    })

    app.post('/signout', (req, res) => {
        req.session.destroy();
        res.send('OK')
    })

    app.get('/login', (req, res) => {
        if (req.session.userEmail) {
            userService.loadFromSession(req.session.userEmail)
                .then(user => {
                    return res.json(user)
                })
        }
        else res.send(null)
    })

    app.post('/login', (req, res) => {
        const loginDetails = req.body
        userService.checkLogin(loginDetails)
            .then(user => {
                req.session.userEmail = user.email
                res.json(user)
            })
            .catch(err => res.send(err))
    })

    app.post('/user/:userId/lists/:listType', (req, res) => {
        const userId = req.params.userId
        const addItem = req.body
        const listType = req.params.listType
        userService.addToListByType(userId, addItem, listType)
            .then(() => {
                res.send('OK')
            })
    })

    app.delete('/user/:userId/lists/:listType/:itemId', (req, res) => {
        const userId = req.params.userId
        const itemId = req.params.itemId
        const listType = req.params.listType
        userService.removeFromListByType(userId, itemId, listType)
            .then(() => {
                res.send('OK')
            })
    })

    app.post('/user/:userId/episodes/:showId', (req, res) => {
        const userId = req.params.userId
        const showId = req.params.showId
        const epId = req.body.epId
        // console.log('mark',userId,showId,epId)
        userService.markWatched(userId, showId, epId)
            .then(() => {
                res.send('OK')
            })
    })

    app.delete('/user/:userId/episodes/:showId/:epId', (req, res) => {
        const userId = req.params.userId
        const showId = req.params.showId
        const epId = req.params.epId
        // console.log('unmark',userId,showId,epId)
        userService.unmarkWatched(userId, showId, epId)
            .then(() => {
                res.send('OK')
            })
    })

    app.get('/user/:userId/activities/:followedId', (req, res) => {
        const userId = req.params.userId
        const followedId = req.params.followedId
        // console.log(userId,followedId)
        userService.getActivitiesByFollowed(followedId)
            .then(activities => {
                res.send(activities)
            })
    })

    app.post('/user/:userId/activities', (req, res) => {
        const userId = req.params.userId
        const activity = req.body
        userService.addActivityByType(userId, activity)
            .then(activity => {
                res.json(activity)
            })
    })

    app.put('/user/:userId/activities/comment', (req, res) => {
        const activity = req.body
        // console.log(activity)
        userService.updateActivity(activity)
            .then(activity => {
                res.send(activity)
            })
    })

    app.put('/user/:userId/activities/like', (req, res) => {
        const activity = req.body
        // console.log(activity)
        userService.updateActivity(activity)
            .then(activity => {
                res.json(activity)
            })
    })

}


module.exports = addRoutes;