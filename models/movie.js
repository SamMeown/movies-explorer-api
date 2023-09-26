const mongoose = require('mongoose');
const validator = require('validator');
const validationMessages = require('../errors/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
  },
  director: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
  },
  duration: {
    type: Number,
    requied: [true, validationMessages.requiredMsg()],
    min: [0, validationMessages.minMsg(0)],
  },
  year: {
    type: String,
    requied: [true, validationMessages.requiredMsg()],
  },
  description: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
  },
  image: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    validate: {
      validator: (v) => validator.isURL(v),
      message: validationMessages.invalidFormat(),
    },
  },
  trailerLink: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    validate: {
      validator: (v) => validator.isURL(v),
      message: validationMessages.invalidFormat(),
    },
  },
  thumbnail: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    validate: {
      validator: (v) => validator.isURL(v),
      message: validationMessages.invalidFormat(),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validationMessages.requiredMsg()],
  },
  movieId: {
    type: Number,
    required: [true, validationMessages.requiredMsg()],
  },
  nameRU: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
  },
  nameEN: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
  },
});

movieSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v; // eslint-disable-line no-param-reassign
    return ret;
  },
});

module.exports = mongoose.model('movie', movieSchema);
