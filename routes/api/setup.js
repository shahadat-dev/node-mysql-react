const express = require('express')
const router = express.Router()
const db = require('../../config/db')

// @route   GET /api/setup/createdb
// @desc    Create DB
// @access  Public
router.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  // let sql = 'SHOW DATABASES'
  db.query(sql, (err, result) => {
    if (err) {
      return res.send(err.sqlMessage)
    }
    res.send('Database created...')
  })
})

// @route   GET /api/setup/createtable
// @desc    Create Table
// @access  Public
router.get('/createtable', (req, res) => {
  let sql =
    'CREATE TABLE users (id int AUTO_INCREMENT, email CHAR(50) NOT NULL UNIQUE, username CHAR(20) NOT NULL UNIQUE, password CHAR(60) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id) )'

  db.query(sql, (err, result) => {
    if (err) {
      return res.send(err.sqlMessage)
    }
    res.send('Table created...')
  })
})

module.exports = router
