const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')

const getAllUsers = async (req, res, next) => {
  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const users = await User.find({})
    res.status(200).send({
      data: users,
      status: 200,
      numberOfUsers: users.length
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = getAllUsers
