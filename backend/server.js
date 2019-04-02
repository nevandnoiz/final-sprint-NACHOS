const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const axios = require('axios')

// console.log(config)

// Set routes into variables. ex: 'const addMoviesRoute = require('./routes/movies-route')'
const addMoviesRoute = require('./routes/movies-route')
const addTwitterRoutes = require('./routes/twitter-route')
const addTvRoute = require('./routes/tv-route')
const addActorsRoute = require('./routes/actors-route')
const addReviewsRoute = require('./routes/reviews-route')
const addUserRoute = require('./routes/user-route')

const app = express()
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Add routes here. ex: 'addMoviesRoute(app)'
addMoviesRoute(app)
addTvRoute(app)
addActorsRoute(app)
addReviewsRoute(app)
addTwitterRoutes(app)
// addUserRoute(app)
addUserRoute(app)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))

// console.log(request)