const express = require('express')
const router = express.Router()
const restaurantApi = require('./restaurant')

router.use('/api/v1/restaurants', restaurantApi)

module.exports = router