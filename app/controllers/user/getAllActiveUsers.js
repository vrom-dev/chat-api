const ActiveUsers = require('../../models/activeUsers')

const activeUsersList = (activeUsers) => {
  const activeUsersKeys = Object.keys(activeUsers)
  const newActiveUsersObject = activeUsersKeys.reduce((acc, channel) => {
    acc[channel] = [...new Set(activeUsers[channel].map(user => user.username))]
    return acc
  }, {})
  return newActiveUsersObject
}

const getAllActiveUsers = (req, res, next) => {
  try {
    res.status(200).send({
      data: activeUsersList(ActiveUsers),
      status: 200
    })
  } catch (e) {
    next(e)
  }
}

module.exports = getAllActiveUsers
