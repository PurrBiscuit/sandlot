const express = require('express')
const router = express.Router()


router.get('/me', (req, res) => {
  const userInfo = req.session.user
  const throttle = req.query.throttle ? parseInt(req.query.throttle) : 0

  // wrap this in a setTimeout to simulate a slow user retrieval to
  // test out some client-side api data loading UI things
  setTimeout(() => {
    res.json({ ...userInfo })
  }, throttle)
})

module.exports = router;
