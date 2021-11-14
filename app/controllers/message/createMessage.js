// https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Message = require('../../models/message')

const createMessage = async (req, res, next) => {
  const { content } = req.body
  const { user } = req
  const { id } = req.params

  if (!content || !id) {
    return next(new Error('Required request field not provided'))
  }
  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const messageObj = {
      content,
      user: user.id,
      chatRoom: id,
      createdAt: new Date()
    }

    const message = new Message(messageObj)
    const newMessage = await message.save()
    res.status(201).send(newMessage)
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = createMessage
