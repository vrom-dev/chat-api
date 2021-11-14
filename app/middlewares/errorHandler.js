const errorHandler = (error, req, res, next) => {
  console.log(`Error: ${error.message}`)

  if (error.message === 'Required request field not provided') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Invalid credentials for this action') {
    return res
      .status(403)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Google user not registered') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Token missing, expired or invalid' || error.message.startsWith('Token used too late')) {
    return res
      .status(401)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Requested data not found') {
    return res
      .status(404)
      .send({ error: `${error.message}` })
  }

  if (error.message.includes('Cast to ObjectId failed')) {
    return res
      .status(400)
      .send({ error: 'Invalid id provided' })
  }

  if (error.message.includes('validation failed')) {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Invalid username or password') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }
}

module.exports = errorHandler
