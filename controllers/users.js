const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoServerError } = require('mongodb'); // eslint-disable-line import/no-extraneous-dependencies

const User = require('../models/user');
const httpErrors = require('../errors/http');
const authErrors = require('../errors/auth');

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

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key';

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id }, secretKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err instanceof authErrors.CredentialsNotValidError) {
        next(new httpErrors.UnauthorizedError(err.message));
        return;
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId).orFail()
    .then((user) => {
      res.send(user.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new httpErrors.NotFoundError('Пользователь не найден'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }

      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  ).orFail()
    .then((user) => {
      res.send(user.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new httpErrors.NotFoundError('Пользователь не найден'));
        return;
      }
      if (err instanceof MongoServerError && err.code === 11000) {
        next(new httpErrors.ConflictError(err.message));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
};
