const mongoose = require('mongoose');
const validator = require('validator');
const validationMessages = require('../errors/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, validationMessages.minlengthMsg(2)],
    maxlength: [30, validationMessages.maxlengthMsg(30)],
    required: [true, validationMessages.requiredMsg()],
  },
  email: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    unique: [true, validationMessages.uniqueMsg()],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validationMessages.invalidFormat(),
    },
  },
  password: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    minlength: [4, validationMessages.minlengthMsg(4)],
    maxlength: [256, validationMessages.maxlengthMsg(256)],
    select: false,
  },
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v; // eslint-disable-line no-param-reassign
    return ret;
  },
});

module.exports = mongoose.model('user', userSchema);
