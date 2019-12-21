import { models } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/products/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const product = await models.Product.create(data);
    return product;
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
