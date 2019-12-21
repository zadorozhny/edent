import Joi from '@hapi/joi';
import { Identifier as UserId } from '@/schemas/User';

export const Identifier = Joi.number().integer().positive();

export default Joi.object({
  status: Joi.valid('pending', 'finished', 'closed'),
  email: Joi.string(),
  phone: Joi.string(),
  name: Joi.string(),
  shipping: Joi.valid('post', 'courier'),
  address: Joi.string(),
  userId: UserId
});
