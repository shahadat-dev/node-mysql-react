const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../config/db')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Find user by id
      let sql = `SELECT * FROM users WHERE id = '${jwt_payload.id}'`
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
        }

        if (result.length !== 0) {
          return done(null, result[0])
        } else {
          done(null, false)
        }
      })
    })
  )
}
