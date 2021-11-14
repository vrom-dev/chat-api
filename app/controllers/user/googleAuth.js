const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()

const { connect, connection } = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')
const userColors = require('../../utils/userColors')

const googleAuth = async (req, res, next) => {
  const { token } = req.body
  if (!token) {
    return next(new Error('Required request field not provided'))
  }
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  let ticket
  try {
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
  } catch (e) {
    return next(new Error('Token missing, expired or invalid'))
  }

  const payload = ticket.getPayload()

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const user = await User.findOne({ email: payload.email })
    if (!user) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(payload.sub + Date.now(), saltRounds)

      const numberOfColors = userColors.length
      const userColor = userColors[Math.floor(Math.random() * numberOfColors)]

      const userObj = new User({
        username: payload.sub,
        email: payload.email,
        password: passwordHash,
        userColor,
        registeredAt: new Date()
      })
      const newUser = await userObj.save()
      const userObjForToken = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        userColor: newUser.userColor
      }
      const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)
      res.status(201).send({
        data: {
          token,
          id: userObjForToken.id,
          username: userObj.username,
          email: userObj.email,
          userColor: userObj.userColor
        },
        status: 201
      })
      connection.close()
      return next()
    } else {
      const userObjForToken = {
        id: user._id,
        username: user.username,
        email: user.email,
        userColor: user.userColor
      }
      const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)
      res.status(200).send({
        data: {
          token,
          id: userObjForToken.id,
          username: user.username,
          email: user.email,
          userColor: user.userColor
        },
        status: 200
      })
      connection.close()
    }
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = googleAuth
