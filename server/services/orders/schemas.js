import Joi from '@hapi/joi';

import Order, { Identifier } from '@/schemas/Order';
import { Identifier as ProductId } from '@/schemas/Product';
import { Identifier as UserId } from '@/schemas/User';

export const order = {
  identifier: Identifier,
  create: Order.concat(Joi.object({
    status: Joi.forbidden(),
    email: Joi.optional(),
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
    email: Joi.optional(),
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
    userId: Joi.optional(),
    products: Joi.optional()
  })),
  filters: Joi.object({
    search: Joi.string().empty(''),
    status: Joi.valid('pending', 'finished', 'closed'),
    shipping: Joi.valid('post', 'courier'),
    productId: ProductId,
    userId: UserId
  })
};
