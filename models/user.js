const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const validationMessages = require('../errors/validation');
const authErrors = require('../errors/auth');

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

function loginFailedReject() {
  return Promise.reject(new authErrors.CredentialsNotValidError());
}

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return loginFailedReject();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return loginFailedReject();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
