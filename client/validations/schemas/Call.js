import * as validators from '@/validations/validators';

export const phone = {
  phone: validators.phone('Неверный формат телефона'),
  required: validators.required('Обязательное поле')
};
