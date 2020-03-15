import { models, sequelize } from '@/database';
import { service, schema } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/products/Utility';
import { product as schemas } from '@/services/products/schemas';

@service
export default class Admin extends Utility {
  @schema(schemas.create)
  async create(data) {
    const transaction = await sequelize.transaction();
    const { categoryId } = data;
    try {
      const product = await models.Product.create(data, {
        include: [{
          model: models.Manufacturer,
          as: 'manufacturer'
        }],
        transaction
      });
      const category = await models.Category.findByPk(categoryId);
      const categories = await category.getAncestors();
      await product.setCategories([categoryId, ...categories.map(({ id }) => id)], {
        transaction
      });
      await transaction.commit();
      return product;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  @schema(schemas.identifier, schemas.update)
  async update(id, data) {
    const transaction = await sequelize.transaction();
    const { categoryId } = data;
    try {
      const [count, [product]] = await models.Product.update(data, {
        where: { id },
        returning: true,
        transaction
      });
      if (!count) {
        throw new ServiceError('not found', ERRORS.PRODUCT_NOT_FOUND);
      }
      if (categoryId) {
        const category = await models.Category.findByPk(categoryId);
        const categories = await category.getAncestors();
        await product.setCategories([categoryId, ...categories.map(({ id }) => id)], {
          transaction
        });
      }
      await transaction.commit();
      return product;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  @schema(schemas.identifier)
  async remove(id) {
    const count = await models.Product.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.PRODUCT_NOT_FOUND);
    }
  }
}
