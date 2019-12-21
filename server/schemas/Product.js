import Joi from '@hapi/joi';

export const Identifier = Joi.number().integer().positive();

export default Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  image: Joi.string(),
  isHidden: Joi.boolean().default(false)
});
