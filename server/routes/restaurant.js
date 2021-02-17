const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(cors())
router.use(express.json())

const db = require('../db')

// Get All Restaurants
router.get('/', async (req, res) => {

    try {
        const results = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;")
        res.status(200).json({
            results: results.rows.length,
            data: {
                restaurant: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }

})

// Get Single Restaurant
router.get('/:id', async (req, res) => {

    try {
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", 
            [req.params.id])

        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id])
        res.status(200).json({
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Create Restaurant
router.post('/', async (req, res) => {

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Update Restaurant
router.put('/:id', async (req, res) => {

    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Delete Restaurant
router.delete('/:id', async (req, res) => {

    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1 returning *",
            [req.params.id])
        res.status(204).json({
            message: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

// Create Review
router.post('/:id/addreview', async (req, res) => {

    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
            [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router