import { models } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';

@service
export default class Admin {
  async getOne(userId) {
    const user = await models.User.findByPk(userId);
    return user;
  }

  async getList() {
    const users = await models.User.findAll();
    return users;
  }

  async update(id, data) {
    const [count, [user]] = await models.User.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  async remove(id) {
    const count = await models.User.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.USER_NOT_FOUND);
    }
  }
}
