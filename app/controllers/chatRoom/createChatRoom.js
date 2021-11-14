const fs = require('fs')
const { promisify } = require('util')
const unlinkFile = promisify(fs.unlink)

const { connect, connection } = require('mongoose')
const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')

const ChatRoom = require('../../models/chatRoom')
const { uploadFileStream } = require('../../utils/s3')

const createChatRoom = async (req, res, next) => {
  const { name } = req.body
  const { user } = req

  if (!name || !user || !req.file) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const result = await uploadFileStream(req.file)
    await unlinkFile(req.file.path)
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const chatRoom = new ChatRoom({
      name,
      createdBy: user.id,
      createdAt: new Date(),
      image: `/files/${result.Key}`
    })
    const newChatRoom = await chatRoom.save()
    res.status(201).send(newChatRoom)
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = createChatRoom
