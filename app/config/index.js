require('dotenv').config()
const { MONGODB_CONFIG, MONGODB_URI } = require('./mongo')

const PORT = process.env.PORT || 3003

module.exports = {
  MONGODB_CONFIG,
  MONGODB_URI,
  PORT
}
