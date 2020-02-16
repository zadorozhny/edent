import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const category = await models.Category.findByPk(id);
    return category;
  }

  async getList() {
    const categories = await models.Category.findAll();
    return categories;
  }
}
