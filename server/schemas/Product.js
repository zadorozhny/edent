import Joi from '@hapi/joi';
import { Identifier as ManufacturerId } from '@/schemas/Manufacturer';
import { Identifier as CategoryId } from '@/schemas/Category';

export const Identifier = Joi.number().integer().positive();

export default Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  image: Joi.string(),
  isHidden: Joi.boolean().default(false),
  manufacturerId: ManufacturerId,
  categoryId: CategoryId
});
