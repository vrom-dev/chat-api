const createUser = require('./createUser')
const loginUser = require('./loginUser')
const googleAuth = require('./googleAuth')
const getAllUsers = require('./getAllUsers')
const getAllActiveUsers = require('./getAllActiveUsers')
const getUser = require('./getUser')
const renameUser = require('./renameUser')

module.exports = {
  createUser,
  loginUser,
  googleAuth,
  getAllUsers,
  getAllActiveUsers,
  getUser,
  renameUser
}
