const app = require('express')()
require('dotenv').config()

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
})