import * as Order from '@/validations/schemas/Order';

export const details = {
  phone: Order.phone,
  email: Order.email,
  fullName: Order.fullName,
  city: Order.city,
  address: Order.address
};
