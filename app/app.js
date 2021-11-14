const express = require('express')
const { PORT } = require('./config')
const app = express()
const cors = require('cors')

// SOCKET-IO
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: { origin: '*' }
})
const initListeners = require('./listeners')

initListeners(io)

// MIDDLEWARES
const errorHandler = require('./middlewares/errorHandler')

// ROUTES
const userRoute = require('./routes/userRoute')
const chatRoomRoute = require('./routes/chatRoomRoute')
const messageRoute = require('./routes/messageRoute')
const filesRoute = require('./routes/filesRoute')
const resetRoute = require('./routes/resetRoute')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRoute)
app.use('/', chatRoomRoute)
app.use('/', messageRoute)
app.use('/', filesRoute)
app.use('/', resetRoute)
app.use(errorHandler)

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
