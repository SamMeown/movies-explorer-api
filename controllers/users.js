const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { MongoServerError } = require('mongodb'); // eslint-disable-line import/no-extraneous-dependencies

const User = require('../models/user');
const httpErrors = require('../errors/http');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userJson = user.toObject();
      delete userJson.password;
      res.status(201).send(userJson);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      if (err instanceof MongoServerError && err.code === 11000) {
        next(new httpErrors.ConflictError(err.message));
        return;
      }
      next(err);
    });
};
