import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Admin {
  async getList() {
    const categories = await models.Category.findAll({ hierarchy: true });
    return categories;
  }
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }
}
