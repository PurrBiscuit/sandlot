const express = require('express')
const router = express.Router()

// demonstrate how the send an error object using the next in middleware

// const causeError = (req, res, next) => {
//   console.log('whattt')
//   next({
//     status: 401,
//     message: 'Something Bad Happened'
//   })
// }

// router.use(causeError)

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource')
})

module.exports = router
