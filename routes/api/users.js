const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const db = require('../../config/db')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route   GET /api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works'
  })
)

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Check if Email already exists
  let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      return res.send(err.sqlMessage)
    }

    if (result.length > 0) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    }

    // Check if username already exists
    let sql = `SELECT * FROM users WHERE username = '${req.body.username}'`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        return res.send(err.sqlMessage)
      }
      if (result.length > 0) {
        errors.email = 'Username already exists'
        return res.status(400).json(errors)
      }

      // Create new user
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash

          let sql = 'INSERT INTO users SET ?'
          db.query(sql, user, (err, result) => {
            if (err) {
              console.log(err)
              return res.send(err.sqlMessage)
            }
            res.json({
              status: 'ok',
              msg: 'User registered successfully...',
              data: { username: req.body.username, email: req.body.email }
            })
          })
        })
      })
    })
  })
})

// @route   POST /api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  let sql = `SELECT * FROM users WHERE email = '${email}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      return res.send(err.sqlMessage)
    }

    if (result.length === 0) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    const user = result[0]

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        }

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              msg: 'success',
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Password incorrect'
        res.status(400).json(errors)
      }
    })
  })
})

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
  }
)

module.exports = router
