import Joi from '@hapi/joi';

export const Identifier = Joi.number().integer().positive();
export const Email = Joi.string().email();
export const Password = Joi.string();

export default Joi.object({
  role: Joi.valid('user', 'admin'),
  name: Joi.string(),
  email: Email,
  phone: Joi.string(),
  password: Password
});
