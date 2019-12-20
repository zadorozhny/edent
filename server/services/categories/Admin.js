import { models } from '@/database';
import { service } from '@/lib/decorators';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/categories/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }

  async update(id, data) {
    const [count, [category]] = await models.Category.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError(401, 'ERRORS.SOMETHING_WENT_WRONG');
    }
    return category;
  }

  async remove(id) {
    const count = await models.Category.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError(404, 'ERRORS.LINK_NOT_FOUND');
    }
  }
}
