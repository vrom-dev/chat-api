const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Message = require('../../models/message')

const getAllMessagesFromRoom = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return next(new Error('Required request field not provided'))
  }
  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const messages = await Message.find({ chatRoom: id })
    res.status(200).send({
      data: messages,
      status: 200,
      numberOfMessages: messages.length
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = getAllMessagesFromRoom
