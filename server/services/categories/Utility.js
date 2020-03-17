import { models } from '@/database';
import { service, schema } from '@/lib/decorators';
import { category as schemas } from '@/services/categories/schemas';

@service
export default class Utility {
  @schema(schemas.identifier)
  async getOne(id) {
    const category = await models.Category.findByPk(id);
    return category;
  }

  @schema(schemas.filters)
  async getList(filters) {
    const categories = await models.Category
      .scope(
        { method: ['filter', filters] }
      )
      .findAll({
        hierarchy: filters.hierarchy
      });
    return categories;
  }
}
