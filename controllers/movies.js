const mongoose = require('mongoose');

const Movie = require('../models/movie');
const httpErrors = require('../errors/http');

module.exports.addMovie = (req, res, next) => {
  const { _id: owner } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer: trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie.toObject()))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  const { _id: owner } = req.user;
  Movie.find({ owner }).populate('owner')
    .then((movies) => res.send(movies.map((movie) => movie.toObject())))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: owner } = req.user;
  const { movieId } = req.params;
  Movie.findById(movieId).orFail()
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        throw new httpErrors.ForbiddenError('Фильм не принадлежит пользователю');
      }

      return Movie.deleteOne({ _id: movieId, owner }).orFail();
    })
    .then(() => {
      res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new httpErrors.NotFoundError('Фильм не найден'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
};
