const resetRoute = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')
const { resetChat } = require('../controllers/reset')

resetRoute.post(
  '/reset',
  tokenExtractor,
  userExtractor,
  resetChat
)
module.exports = resetRoute
