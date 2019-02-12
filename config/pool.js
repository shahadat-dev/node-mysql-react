const mysql = require('promise-mysql')

module.exports = pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})
