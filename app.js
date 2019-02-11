const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const setup = require('./routes/api/setup')

const app = express()

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// Cors
app.use(cors())

// DB initialize
require('./config/db')

// Use Routes
app.use('/api/setup', setup)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))
