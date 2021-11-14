const userRoute = require('express').Router()

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

const {
  createUser,
  loginUser,
  googleAuth,
  getAllUsers,
  getAllActiveUsers,
  getUser,
  renameUser
} = require('../controllers/user')

userRoute.put('/user/:id', tokenExtractor, userExtractor, renameUser)
userRoute.post('/user', createUser)
userRoute.get('/user/active', getAllActiveUsers)
userRoute.get('/user/:id', getUser)
userRoute.get('/user', getAllUsers)
userRoute.post('/login', loginUser)
userRoute.post('/login/google', googleAuth)

module.exports = userRoute
