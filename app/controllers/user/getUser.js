const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/user')

const getAllUsers = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const user = await User.findById(id)

    if (!user) {
      return next(new Error('Requested data not found'))
    }
    res.status(200).send(user)
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = getAllUsers
