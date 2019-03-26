const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const axios = require('axios')

// Set routes into variables. ex: 'const addMoviesRoute = require('./routes/movies-route')'
const addMoviesRoute = require('./routes/movies-route')
const addTvRoute = require('./routes/tv-route')
const addActorsRoute = require('./routes/actors-route')
const addReviewsRoute = require('./routes/reviews-route')
// const addUserRoute = require('./routes/user-route')

const app = express()
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
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

app.get('/all', (req, res) => {
  return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=1`)
  .then(trending => res.send(trending.data))
  .catch(err => {
      console.log('details')
  })
})

// Add routes here. ex: 'addMoviesRoute(app)'
addMoviesRoute(app)
addTvRoute(app)
addActorsRoute(app)
addReviewsRoute(app)
// addUserRoute(app)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))