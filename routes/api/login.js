const express = require('express')
const router = express.Router()

const logUserIn = (req, res) => {
  // set the loggedIn session property to true
  req.session.user = {
    username: req.body.username
  }

  // return json with a redirect url for the fetch to use to set window.location.href
  return res.json({
    redirectUrl: '/'
  })
}

router.post('/', (req, res) => {
  if (req.body.username === 'spurr@articulate.com' && req.body.password === 'password')
    return logUserIn(req, res)

  // return a 401 if username and password don't match
  return res.status(401).end()
})

module.exports = router
