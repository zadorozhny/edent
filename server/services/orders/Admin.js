import { models, sequelize } from '@/database';
import { service, schema } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/orders/Utility';
import { order as schemas } from '@/services/orders/schemas';

@service
export default class Admin extends Utility {
  @schema(schemas.identifier, schemas.update)
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
        products.reduce((acc, item) => {
          if (!item.deleted) {
            acc.push({ ...item, productId: item.product.id, orderId: order.id });
          }
          return acc;
        }, []),
        { updateOnDuplicate: ['count', 'price'], transaction }
      );
      const ids = products.reduce((ids, item) => {
        if (item.deleted) {
          ids.push(item.product.id);
        }
        return ids;
      }, []);
      if (ids.length) {
        await models.OrderToProducts.destroy({
          transaction,
          where: {
            productId: ids,
            orderId: order.id
          }
        });
      }
      await transaction.commit();
      return order;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  @schema(schemas.identifier)
  async getOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          model: models.OrderToProducts,
          as: 'products',
          attributes: ['price', 'count'],
          include: [{
            model: models.Product,
            as: 'product',
            attributes: ['id', 'name'],
          }]
        }
      ]
    });
    return order;
  }

  @schema(schemas.filters)
  async getList(filters) {
    const { rows, count } = await models.Order
      .scope(
        { method: ['filter', filters] },
        { method: ['pagination', filters] }
      )
      .findAndCountAll({
        include: [
          {
            model: models.OrderToProducts,
            as: 'products',
            attributes: ['price', 'count'],
            include: [{
              model: models.Product,
              as: 'product',
              attributes: ['id', 'name'],
            }]
          }
        ],
        distinct: true
      });
    return { rows, count };
  }

  @schema(schemas.identifier)
  async remove(id) {
    const count = await models.Order.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.ORDER_NOT_FOUND);
    }
  }
}
