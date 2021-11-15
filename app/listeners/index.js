const userJoinsChannel = require('../events/userJoinsChannel')
const userSendsMessage = require('../events/userSendsMessage')
const userDisconnects = require('../events/userDisconnects')

const ActiveUsers = require('../models/activeUsers')

const activeUsersList = (activeUsers) => {
  const activeUsersKeys = Object.keys(activeUsers)
  const newActiveUsersObject = activeUsersKeys.reduce((acc, channel) => {
    acc[channel] = activeUsers[channel].map(user => user.username)
    return acc
  }, {})
  return newActiveUsersObject
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('user joins channel', ({ channel, username }) => {
      userJoinsChannel(socket, channel, ActiveUsers, username)
      io.emit('active users', activeUsersList(ActiveUsers))
    })
    socket.on('user sends message', (data) => {
      userSendsMessage(socket, data)
    })
    socket.on('disconnect', () => {
      userDisconnects(socket, ActiveUsers)
      io.emit('active users', activeUsersList(ActiveUsers))
    })
  })
}
