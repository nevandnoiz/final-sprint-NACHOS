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

    app.post('/singup', (req, res) => {
        const nickname = req.body.nickname
        userService.addUser({ nickname })
            .then(user => res.json(user))
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

    app.post('/user/:userId/activities', (req, res) => {
        const userId = req.params.userId
        const activity = req.body
        userService.addActivityByType(userId, activity)
            .then(activity => {
                res.json(activity)
            })
    })

}


module.exports = addRoutes;