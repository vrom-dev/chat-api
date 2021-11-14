const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const ChatRoom = require('../../models/chatRoom')

const getChatRoom = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const chatRooms = await ChatRoom.findById(id, { createdAt: 0, createdBy: 0 })
    if (!chatRooms) {
      return next(new Error('Requested data not found'))
    }
    res.status(200).send({
      data: chatRooms,
      status: 200
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = getChatRoom
