const express = require('express')
const router = express.Router()
router.use(express.json())

// Get All Restaurants
router.get('/', (req, res) => {
    res.status(200).json({
        data: {
            restaurant: ["burgerking", "starbucks"]
        }
    })
})

// Get Single Restaurant
router.get('/:id', (req, res) => {
    console.log(req.params)

    res.status(200).json({
        data: {
            restaurant: "burgerking"
        }
    })
})

// Create Restaurant
router.post('/', (req, res) => {
    console.log(req.body)

    res.status(201).json({
        data: {
            restaurant: "burgerking"
        }
    })
})

// Update Restaurant
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body)

    res.status(200).json({
        data: {
            restaurant: "burgerking"
        }
    })
})

router.delete('/:id', (req, res) => {
    res.status(204).json({
        message: "success"
    })
})

module.exports = router