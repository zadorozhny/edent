import Joi from '@hapi/joi';

import Product, { Identifier } from '@/schemas/Product';

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
    manufacturerId: Joi.string(),
    categoryId: Joi.string(),
    price: Joi.string(),
    isHidden: Joi
      .alternatives()
      .conditional(
        Joi.ref('$instance.user.role'),
        {
          is: 'admin',
          then: Joi.valid('false', 'true').empty(''),
          otherwise: Joi.valid('false').default('false')
        }
      ),
    order: Joi.string().empty('').default('createdAt,DESC'),
    limit: Joi.string(),
    offset: Joi.string()
  })
};
