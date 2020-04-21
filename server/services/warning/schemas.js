import Joi from '@hapi/joi';

import Warning from '@/schemas/Warning';

export const warning = {
  update: Warning.concat(Joi.object({
    show: Joi.boolean().default(false),
    descrition: Joi.string().empty(''),
  }))
};
