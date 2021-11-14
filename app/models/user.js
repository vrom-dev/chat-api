const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const validateEmail = function (email) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 4,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 4,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    require: true
  },
  registeredAt: {
    type: Date,
    required: true
  },
  userColor: {
    type: String,
    required: true
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
    delete transformedObject.password
  }
})

const User = model('User', userSchema)

module.exports = User
