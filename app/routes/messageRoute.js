const messageRoute = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

const {
  createMessage,
  getAllMessagesFromRoom
} = require('../controllers/message')

messageRoute.get('/room/:id/messages',
  tokenExtractor,
  userExtractor,
  getAllMessagesFromRoom
)
messageRoute.post('/room/:id',
  tokenExtractor,
  userExtractor,
  createMessage
)

module.exports = messageRoute
