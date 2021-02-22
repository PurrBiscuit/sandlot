const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')

const app = express()

// function to check if the user is logged in or not
const loggedIn = (req, res, next) => {
  if (req.session.user || req.url === '/login')
    return next()

  res.writeHead(302, { Location: '/login' }).end()
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
  secret: 'veryimportantsecret',
  name: process.env.COOKIE_NAME
}))

// middleware to check user's logged in status based on their session
app.use(loggedIn)

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
