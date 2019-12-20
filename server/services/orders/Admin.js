import { models } from '@/database';
import { service } from '@/lib/decorators';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/orders/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }

  async update(id, data) {
    const [count, [order]] = await models.Order.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError(401, 'ERRORS.SOMETHING_WENT_WRONG');
    }
    return order;
  }

  async remove(id) {
    const count = await models.Order.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError(404, 'ERRORS.LINK_NOT_FOUND');
    }
  }
}
