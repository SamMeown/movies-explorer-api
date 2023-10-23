// eslint-disable-next-line no-unused-vars
module.exports = ((err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode && message) {
    res.status(statusCode).send({ message });
    return;
  }

  res.status(500).send({ message: 'Произошла ошибка' });
});
