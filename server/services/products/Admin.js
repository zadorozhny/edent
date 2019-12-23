import { models, sequelize, Op } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/products/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const product = await models.Product.create(data, {
        include: [{
          model: models.Manufacturer,
          as: 'manufacturer'
        }],
        transaction
      });
      const categories = await models.Category
        .scope(
          { method: ['filter', data] }
        )
        .findAll({ transaction });
      await product.setCategories(categories.map(category => category.id), {
        transaction
      });
      await transaction.commit();
      return product;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id, data) {
    const [count, [product]] = await models.Product.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async remove(id) {
    const count = await models.Product.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.PRODUCT_NOT_FOUND);
    }
  }
}
