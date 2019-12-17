import { models } from '@/database';
import { service } from '@/lib/decorators';
import Utility from '@/services/products/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const product = await models.Product.create(data);
    return product;
  }
}
