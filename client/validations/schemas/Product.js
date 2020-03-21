import * as validators from '@/validations/validators';

export const name = {
  maxLength: validators.maxLength(250, 'Максимальное количество символов 250'),
  required: validators.required('Обязательное поле')
};
export const image = {
  required: validators.required('Обязательное поле')
};
export const categoryId = {
  digits: validators.digits('Должно быть число'),
  required: validators.required('Обязательное поле')
};
export const manufacturerId = {
  digits: validators.digits('Должно быть число'),
  required: validators.required('Обязательное поле')
};
export const price = {
  digits: validators.digits('Должно быть число'),
  required: validators.required('Обязательное поле')
};
export const description = {
  maxLength: validators.maxLength(5000, 'Максимальное количество символов 5000'),
  required: validators.required('Обязательное поле')
};
