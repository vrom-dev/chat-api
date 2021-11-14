const jwt = require('jsonwebtoken')
const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../config')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  const { token } = req
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

  if (!token || !decodedToken.id) {
    return next(new Error('Token missing, expired or invalid'))
  }
  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const user = await User.findById(decodedToken.id)
    connection.close()
    if (!user) {
      return next(new Error('Token missing, expired or invalid'))
    }

    req.user = user
    next()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = userExtractor
