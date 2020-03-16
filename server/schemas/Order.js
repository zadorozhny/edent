import Joi from '@hapi/joi';
import { Identifier as UserId } from '@/schemas/User';
import { Identifier as ProductId } from '@/schemas/Product';

export const Identifier = Joi.number().integer().positive();

export const OrderProduct = Joi.object({
  id: ProductId,
  price: Joi.number().integer().positive(),
  count: Joi.number().integer().positive()
});

export default Joi.object({
  status: Joi.valid('pending', 'finished', 'closed'),
  email: Joi.string(),
  phone: Joi.string(),
  shipping: Joi.valid('post', 'courier'),
  city: Joi.string(),
  address: Joi.string(),
  userId: UserId,
  products: Joi.array().items(OrderProduct).min(1)
});
