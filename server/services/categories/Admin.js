import { models } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/categories/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }

  async update(id, data) {
    console.log(data);
    const [count, [category]] = await models.Category.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  async remove(id) {
    const count = await models.Category.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.CATEGORY_NOT_FOUND);
    }
  }
}
