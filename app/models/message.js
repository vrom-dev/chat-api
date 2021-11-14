const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  content: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

messageSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
  }
})

const Message = model('Message', messageSchema)

module.exports = Message
