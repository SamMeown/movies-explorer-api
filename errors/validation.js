module.exports = {
  minlengthMsg: (length) => `минимальная длина поля - ${length}`,

  maxlengthMsg: (length) => `максимальная длина поля - ${length}`,

  minMsg: (v) => `минимальное значение ${v}`,

  maxMsg: (v) => `максимальное значение ${v}`,

  requiredMsg: () => 'поле обязательно',

  uniqueMsg: () => 'значение должно быть уникальным',

  invalidFormat: () => 'невалидный формат',
};
