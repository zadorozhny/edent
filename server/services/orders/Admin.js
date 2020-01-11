import { models } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/orders/Utility';

@service
export default class Admin extends Utility {
  async update(id, data) {
    const [count, [order]] = await models.Order.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.ORDER_NOT_FOUND);
    }
    return order;
  }

  async remove(id) {
    const count = await models.Order.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.ORDER_NOT_FOUND);
    }
  }
}
