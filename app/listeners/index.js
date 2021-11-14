// https://aleemisiaka.com/blog/socketio-app-structure/
const fs = require('fs')
const path = require('path')

const initListeners = io => {
  const listenersPath = path.resolve(__dirname)

  fs.readdir(listenersPath, (err, files) => {
    if (err) {
      process.exit(1)
    }

    files.forEach(fileName => {
      if (fileName !== 'index.js') {
        console.debug('Initializing listener from: %s', fileName)
        const listener = require(path.resolve(__dirname, fileName))
        listener(io)
      }
    })
  })
}

module.exports = initListeners
