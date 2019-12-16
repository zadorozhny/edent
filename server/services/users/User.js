import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class User {
  async getOne(userId) {
    const user = await models.User.findByPk(userId);
    return user;
  }
}
