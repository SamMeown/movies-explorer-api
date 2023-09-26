module.exports = {
  minlengthMsg: (length) => `минимальная длина поля - ${length}`,

  maxlengthMsg: (length) => `максимальная длина поля - ${length}`,

  requiredMsg: () => 'поле обязательно',

  uniqueMsg: () => 'значение должно быть уникальным',

  invalidFormat: () => 'невалидный формат',
};
