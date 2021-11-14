// https://www.youtube.com/watch?v=Y2ec4KQ7mP8

const { connect, connection } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')

const loginUser = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const user = await User.findOne({ username: username })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      return next(new Error('Invalid username or password'))
    }

    const userObjForToken = {
      id: user._id,
      username,
      email: user.email,
      userColor: user.userColor
    }
    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)
    res.status(200).send(
      {
        token,
        id: userObjForToken.id,
        username: user.username,
        email: user.email,
        userColor: user.userColor
      }
    )
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = loginUser
