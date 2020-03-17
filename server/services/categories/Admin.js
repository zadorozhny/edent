import { models } from '@/database';
import { service, schema } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/categories/Utility';
import { category as schemas } from '@/services/categories/schemas';

@service
export default class Admin extends Utility {
  @schema(schemas.create)
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }

  @schema(schemas.identifier, schemas.update)
  async update(id, data) {
    const [count, [category]] = await models.Category.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  @schema(schemas.identifier)
  async remove(id) {
    const count = await models.Category.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.CATEGORY_NOT_FOUND);
    }
  }
}
