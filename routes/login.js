const express = require('express')
const router = express.Router()

const { title } = require('../lib/constants')

router.get('/', (req, res) => {
  res.render('login', {
    title
  })
})

module.exports = router
