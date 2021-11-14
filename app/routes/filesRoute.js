const filesRoute = require('express').Router()
const { getFile } = require('../controllers/files')
const multerMiddleware = require('../middlewares/multer')

filesRoute.get('/files/:key',
  multerMiddleware,
  getFile
)

module.exports = filesRoute
