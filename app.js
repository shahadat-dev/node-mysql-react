const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

const setup = require('./routes/api/setup')
const users = require('./routes/api/users')

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

// Passport Middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/setup', setup)
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))
