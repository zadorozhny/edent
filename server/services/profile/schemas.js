import Joi from '@hapi/joi';

import { Email, Password } from '@/schemas/User';

export const utility = {
  refresh: Joi.object({
    refreshToken: Joi.string().required()
  }),
  signin: Joi.object({
    email: Email.required(),
    password: Password.required()
  })
};
