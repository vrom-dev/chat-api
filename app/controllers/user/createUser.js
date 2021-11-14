const { connect, connection } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')
const userColors = require('../../utils/userColors')

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const numberOfColors = userColors.length
    const userColor = userColors[Math.floor(Math.random() * numberOfColors)]

    const user = new User({
      username,
      email,
      password: passwordHash,
      userColor,
      registeredAt: new Date()
    })
    const newUser = await user.save()
    const userObjForToken = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      userColor: newUser.userColor
    }
    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)

    res.status(201).send({
      token,
      id: userObjForToken.id,
      username: userObjForToken.username,
      email: userObjForToken.email,
      userColor: userObjForToken.userColor
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = createUser
