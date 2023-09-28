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
