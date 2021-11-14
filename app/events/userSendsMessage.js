module.exports = (
  socket,
  {
    id,
    channel,
    content,
    userColor,
    username
  }
) => {
  socket
    .to(channel)
    .emit('new message', {
      payload: {
        id,
        content,
        userColor,
        username
      }
    })
}
