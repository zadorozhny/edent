import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  }

  async getList(filters) {
    const products = await models.Product
      .scope(
        { method: ['filter', filters] },
        { method: ['pagination', filters] }
      )
      .findAll();
    return products;
  }
}
