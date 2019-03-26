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
                console.log({ user })
                res.json({ user, reviews })
            })
    })

    app.post('/singup', (req, res) => {
        const nickname = req.body.nickname
        userService.addUser({ nickname })
            .then(user => res.json(user))
    })

    app.post('/login', (req, res) => {
        const loginDetails = req.body
        userService.checkLogin(loginDetails)
            .then(user => {
                req.session.user = user
                console.log("login", req.session.user)
                res.json(user)
            })
    })

    app.get('/login', (req, res) => {
        console.log(req.session.user)
        if (req.session.user) res.send(req.session.user)
        else res.send(null)
    })

}


module.exports = addRoutes;