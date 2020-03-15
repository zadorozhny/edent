import Joi from '@hapi/joi';

import Product, { Identifier } from '@/schemas/Product';
import { Identifier as ManufacturerId } from '@/schemas/Manufacturer';
import { Identifier as CategoryId } from '@/schemas/Category';

export const product = {
  identifier: Identifier,
  create: Product.concat(Joi.object({
    name: Joi.required(),
    description: Joi.required(),
    price: Joi.required(),
    image: Joi.required(),
    isHidden: Joi.forbidden(),
    manufacturerId: Joi.required(),
    categoryId: Joi.required()
  })),
  update: Product.concat(Joi.object({
    name: Joi.optional(),
    description: Joi.optional(),
    price: Joi.optional(),
    image: Joi.optional(),
    isHidden: Joi.optional(),
    manufacturerId: Joi.optional(),
    categoryId: Joi.optional()
  })),
  filters: Joi.object({
    search: Joi.string().empty(''),
    manufacturerId: ManufacturerId,
    categoryId: CategoryId,
    price: Joi.number(),
    isHidden: Joi
      .alternatives()
      .conditional(
        Joi.ref('$instance.user.role'),
        { is: 'admin', then: Joi.boolean(), otherwise: Joi.valid(false).default(false) }
      ),
    order: Joi.string().empty('').default('createdAt,DESC'),
    limit: Joi.number().integer(),
    offset: Joi.number().integer()
  })
};
