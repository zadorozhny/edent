import * as validators from '@/validations/validators';

export const phone = {
  phone: validators.phone('Неверный формат телефона'),
  required: validators.required('Обязательное поле')
};
export const email = {
  email: validators.email('Неверный формат почты')
};
export const fullName = {
  required: validators.requiredIf(vm => vm.shipping === 'post'),
  maxLength: validators.maxLength(250, 'Максимальное количество символов 250')
};
export const city = {
  maxLength: validators.maxLength(250, 'Максимальное количество символов 250'),
  required: validators.required('Обязательное поле')
};
export const address = {
  maxLength: validators.maxLength(250, 'Максимальное количество символов 250'),
  required: validators.required('Обязательное поле')
};
