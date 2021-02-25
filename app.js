const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const createError = require('http-errors')
const logger = require('morgan')
const path = require('path')
const redis = require('redis')

const apiRouter = require('./routes/api/index')
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')

const app = express()

const redisClient = redis.createClient(process.env.REDIS_URL)

// function to check if the user is logged in or not
const loggedIn = (req, res, next) => {
  if (req.session.user || req.url === '/login' || req.url === '/' || req.url === '/api/login')
    return next()

  res.writeHead(302, { Location: '/' }).end()
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// express-session session middleware here; this checks for a
// session cookie and adds a session attribute to the request object
app.use(session({
  name: process.env.COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({ client: redisClient })
}))

// middleware to check user's logged in status based on their session
app.use(loggedIn)

app.use('/api', apiRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
