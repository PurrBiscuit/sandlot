const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // only delete session if user information is tied to it
  // which indicates that a user has previously logged in.
  if (req.session.user)
    req.session.destroy(err => {
      if (err) console.log(`Session destroy failed with - ${err}`)

      console.log(`Session destroyed successfully - user logged out.`)
    })

  res.clearCookie(process.env.COOKIE_NAME)
  res.writeHead(302, { Location: '/' }).end()
})

module.exports = router
