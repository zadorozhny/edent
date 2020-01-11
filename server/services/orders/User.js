import { models } from '@/database';
import { service } from '@/lib/decorators';
import Utility from '@/services/orders/Utility';

@service
export default class User extends Utility {
  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }
}
