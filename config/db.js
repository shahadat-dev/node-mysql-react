const mysql = require('mysql')

//DB config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

// Connect to MySql
db.connect(err => {
  if (err) console.log('Error: ', err)
  console.log('MySql connected...')
})

module.exports = db
