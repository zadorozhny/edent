import { models, sequelize } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const { products, ...rest } = data;
      const order = await models.Order.create(rest, { transaction });
      await models.OrderToProducts.bulkCreate(products.map(data => ({
        ...data,
        productId: data.id,
        orderId: order.id
      })), { transaction });
      await transaction.commit();
      return order;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
