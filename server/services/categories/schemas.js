import Joi from '@hapi/joi';

import Category, { Identifier } from '@/schemas/Category';

export const category = {
  identifier: Identifier,
  create: Category.concat(Joi.object({
    name: Joi.required(),
    parentId: Joi.optional()
  })),
  update: Category.concat(Joi.object({
    name: Joi.optional(),
    parentId: Joi.optional()
  })),
  filters: Joi.object({
    search: Joi.string().empty('')
  })
};
