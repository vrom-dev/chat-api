const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req)
  if (req.token === null) {
    return next(new Error('Token missing, expired or invalid'))
  }
  next()
}

module.exports = tokenExtractor
