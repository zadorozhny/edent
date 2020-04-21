import Joi from '@hapi/joi';

export default Joi.object({
  show: Joi.boolean(),
  description: Joi.string()
});
