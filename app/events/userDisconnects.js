const removeSocketFromAllChannel = (socket, activeUsers) => {
  const channels = Object.keys(activeUsers)

  channels.forEach(channel => {
    activeUsers[channel] = activeUsers[channel]
      .filter(user => user.id !== socket.id)
  })
}

module.exports = (socket, activeUsers) => {
  removeSocketFromAllChannel(socket, activeUsers)
}
