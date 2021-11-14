const { connect, connection } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')

const renameUser = async (req, res, next) => {
  const { username } = req.body
  const { id } = req.params
  const { id: userid } = req.user

  if (!username) {
    return next(new Error('Required request field not provided'))
  }

  if (id !== userid) {
    return next(new Error('Invalid credentials for this action'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)

    const user = await User.findByIdAndUpdate(id, { username }, { new: true })
    const userObjForToken = {
      id: user._id,
      username: user.username,
      email: user.email,
      userColor: user.userColor
    }

    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)

    res.status(200).send({
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

module.exports = renameUser
