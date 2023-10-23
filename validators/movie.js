const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  validateAddMovie: celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required().min(0),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().uri({
        scheme: ['http', 'https'],
      }),
      trailer: Joi.string().required().uri({
        scheme: ['http', 'https'],
      }),
      thumbnail: Joi.string().required().uri({
        scheme: ['http', 'https'],
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  validateDeleteMovie: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
};
