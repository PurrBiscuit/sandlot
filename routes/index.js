const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  const { username } = req.session.user

  res.render('index', {
    title: 'Express',
    username
  })
})

module.exports = router
