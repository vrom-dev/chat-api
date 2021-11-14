const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const ChatRoom = require('../../models/chatRoom')

const getAllChatRooms = async (req, res, next) => {
  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const chatRooms = await ChatRoom.find({}, { createdAt: 0, createdBy: 0 })
    res.status(200).send({
      data: chatRooms,
      status: 200,
      numberOfChatRooms: chatRooms.length
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = getAllChatRooms
