import Joi from '@hapi/joi';

import Order, { Identifier } from '@/schemas/Order';

export const order = {
  identifier: Identifier,
  create: Order.concat(Joi.object({
    status: Joi.forbidden(),
    email: Joi.optional().allow(''),
    phone: Joi.required(),
    shipping: Joi.required(),
    fullName: Joi
      .alternatives()
      .conditional(
        'shipping',
        { is: 'post', then: Joi.required(), otherwise: Joi.forbidden() }
      ),
    city: Joi.required(),
    address: Joi.required(),
    userId: Joi.optional().default(Joi.ref('$instance.user.role')),
    products: Joi.required()
  })),
  update: Order.concat(Joi.object({
    status: Joi.optional(),
    email: Joi.optional().allow(''),
    phone: Joi.optional(),
    shipping: Joi.optional(),
    fullName: Joi
      .alternatives()
      .conditional(
        'shipping',
        { is: 'post', then: Joi.optional(), otherwise: Joi.forbidden() }
      ),
    city: Joi.optional(),
    address: Joi.optional(),
    userId: Joi.optional().allow(null),
    products: Joi.optional()
  })),
  filters: Joi.object({
    search: Joi.string().empty(''),
    status: Joi.valid('pending', 'finished', 'closed'),
    shipping: Joi.valid('post', 'courier'),
    productId: Joi.string(),
    limit: Joi.string(),
    offset: Joi.string()
  })
};
