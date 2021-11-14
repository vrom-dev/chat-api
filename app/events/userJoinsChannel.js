const addUserToChannel = (socket, channel, activeUsers, username) => {
  if (!channel) return

  if (!activeUsers[channel]) {
    activeUsers[channel] = []
  }
  activeUsers[channel].push({
    username,
    id: socket.id
  })
}

module.exports = (socket, channel, activeUsers, username) => {
  socket.join(channel)
  addUserToChannel(socket, channel, activeUsers, username)
}
