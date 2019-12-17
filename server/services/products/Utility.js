import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(productId) {
    const product = await models.Product.findByPk(productId);
    return product;
  }
}
