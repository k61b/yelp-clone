const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(cors())
router.use(express.json())

const db = require('../db')

// Get All Places
router.get('/', async (req, res) => {

    try {
        const results = await db.query(
            "select * from places left join (select place_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by place_id) reviews on places.id = reviews.place_id;")
        res.status(200).json({
            results: results.rows.length,
            data: {
                place: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }

})

// Get Single Place
router.get('/:id', async (req, res) => {

    try {
        const place = await db.query(
            "select * from places left join (select place_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by place_id) reviews on places.id = reviews.place_id where id = $1",
            [req.params.id])

        const reviews = await db.query("select * from reviews where place_id = $1", [req.params.id])
        res.status(200).json({
            data: {
                place: place.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Create Place
router.post('/', async (req, res) => {

    try {
        const results = await db.query("INSERT INTO places (name, location, place_type, price_range) values ($1, $2, $3, $4) returning *",
            [req.body.name, req.body.location, req.body.place_type, req.body.price_range])
        res.status(201).json({
            data: {
                places: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Update Places
router.put('/:id', async (req, res) => {

    try {
        const results = await db.query("UPDATE places SET name = $1, location = $2, place_type = $3, price_range = $4 where id = $5 returning *",
            [req.body.name, req.body.location, req.body.place_type, req.body.price_range, req.params.id])
        res.status(200).json({
            data: {
                place: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Delete Place
router.delete('/:id', async (req, res) => {

    try {
        await db.query("DELETE FROM places WHERE id = $1 returning *",
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
        const newReview = await db.query("INSERT INTO reviews (place_id, name, review, rating) values ($1, $2, $3, $4) returning *",
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

// Delete Review
router.delete('/:id/deletereview', async (req, res) => {

    try {
        await db.query("DELETE FROM reviews WHERE place_id = $1 returning *",
            [req.params.id])
        res.status(204).json({
            message: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router