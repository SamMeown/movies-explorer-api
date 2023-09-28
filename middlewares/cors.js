const allowedCors = [
  'http://127.0.0.1:3000',
  'http://moviesex.nomoredomainsrocks.ru',
  'https://moviesex.nomoredomainsrocks.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin, 'access-control-request-headers': requestHeaders } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    req.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
