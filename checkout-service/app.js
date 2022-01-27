const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const routes = require('./routes')

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/api', routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Checkout service is running on port ${PORT}`)
})