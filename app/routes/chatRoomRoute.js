const chatRoomRoute = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')
const multer = require('../middlewares/multer')

const {
  createChatRoom,
  getChatRoom,
  getAllChatRooms
} = require('../controllers/chatRoom')

chatRoomRoute.post(
  '/room',
  tokenExtractor,
  userExtractor,
  multer,
  createChatRoom
)

chatRoomRoute.get(
  '/room/:id',
  tokenExtractor,
  userExtractor,
  getChatRoom
)

chatRoomRoute.get(
  '/room',
  tokenExtractor,
  userExtractor,
  getAllChatRooms
)
module.exports = chatRoomRoute
