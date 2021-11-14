const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const chatRoomSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 4,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true
  }
})

chatRoomSchema.plugin(uniqueValidator)

chatRoomSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
  }
})

const ChatRoom = model('ChatRoom', chatRoomSchema)

module.exports = ChatRoom
