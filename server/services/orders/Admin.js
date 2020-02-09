import { models, sequelize } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/orders/Utility';

@service
export default class Admin extends Utility {
  async update(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const { products, ...rest } = data;
      const [count, [order]] = await models.Order.update(rest, {
        transaction,
        where: { id },
        returning: true
      });
      if (!count) {
        throw new ServiceError('not found', ERRORS.ORDER_NOT_FOUND);
      }
      await models.OrderToProducts.bulkCreate(
        products.map(data => ({ ...data, orderId: order.id })),
        { updateOnDuplicate: ['count', 'price'], transaction }
      );
      await transaction.commit();
      return order;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
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
