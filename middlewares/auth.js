const jwt = require('jsonwebtoken');
const authErrors = require('../errors/auth');
const httpErrors = require('../errors/http');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new httpErrors.UnauthorizedError(authErrors.needsAuth));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new httpErrors.UnauthorizedError(authErrors.needsAuth));
  }

  req.user = payload;

  return next();
};
