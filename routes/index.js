const express = require('express')
const { route } = require('./users')
const createError = require('http-errors')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
