const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('./routes')

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(cookieParser())

app.use('/api', routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`)
})