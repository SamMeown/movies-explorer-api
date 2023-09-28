const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  validateCreateUser: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4).max(256),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  validateLogin: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4).max(256),
    }),
  }),
  validateUpdateUserInfo: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
};
