import * as validators from '@/validations/validators';

export const name = {
  maxLength: validators.maxLength(250, 'Максимальное количество символов 250'),
  required: validators.required('Обязательное поле')
};
export const parentId = {
  digits: validators.digits('Должно быть число')
};
