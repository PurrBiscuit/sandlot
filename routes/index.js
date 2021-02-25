const express = require('express')
const router = express.Router()

const { title } = require('../lib/constants')

/* GET home page. */
router.get('/', (req, res) => {
  const { user: { username } = {}} = req.session

  res.render('index', {
    title,
    username
  })
})

module.exports = router
