require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

const MONGODB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  MONGODB_URI,
  MONGODB_CONFIG
}
