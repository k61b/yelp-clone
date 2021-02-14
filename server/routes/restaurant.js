const express = require('express')
const router = express.Router()
router.use(express.json())

const db = require('../db')

// Get All Restaurants
router.get('/', async (req, res) => {

    try {
        const results = await db.query("select * from restaurants")
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
        const results = await db.query("select * from restaurants where id = $1", [req.params.id])
        res.status(200).json({
            data: {
                restaurant: results.rows[0]
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

module.exports = router