const express = require('express')
const router = express.Router()
const placeApi = require('./place')

router.use('/api/v1/places', placeApi)

module.exports = router