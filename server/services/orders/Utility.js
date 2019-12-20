import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const order = await models.Order.findByPk(id);
    return order;
  }

  async getList() {
    const orders = await models.Order.findAll();
    return orders;
  }
}
