class CredentialsNotValidError extends Error {
  constructor() {
    super('Неправильные почта или пароль');
  }
}

module.exports = {
  needsAuth: 'Необходима авторизация',
  CredentialsNotValidError,
};
