import Joi from '@hapi/joi';

import Manufacturer, { Identifier } from '@/schemas/Manufacturer';

export const manufacturer = {
  identifier: Identifier,
  create: Manufacturer.concat(Joi.object({
    name: Joi.required()
  })),
  update: Manufacturer.concat(Joi.object({
    name: Joi.optional()
  })),
  filters: Joi.object({
    search: Joi.string().empty('')
  })
};
