const { connect, connection } = require('mongoose')
const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')

const ChatRoom = require('../../models/chatRoom')
const Message = require('../../models/message')
const User = require('../../models/user')

const createChatRoom = async (req, res, next) => {
  const { user } = req

  if (!user) {
    return next(new Error('Required request field not provided'))
  }
  if (user.username !== 'vromdev') {
    return next(new Error('Invalid credentials for this action'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    await Message.deleteMany({})
    await ChatRoom.deleteMany({})
    await User.deleteMany({ username: { $not: /^vromdev$/ } })
    res.status(200).send({ status: 200, action: 'DB restored' })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = createChatRoom
