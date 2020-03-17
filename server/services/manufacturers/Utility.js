import { models } from '@/database';
import { service, schema } from '@/lib/decorators';
import { manufacturer as schemas } from '@/services/manufacturers/schemas';

@service
export default class Utility {
  @schema(schemas.identifier)
  async getOne(id) {
    const manufacturer = await models.Manufacturer.findByPk(id);
    return manufacturer;
  }

  @schema(schemas.filters)
  async getList(filters) {
    const manufacturers = await models.Manufacturer
      .scope(
        { method: ['filter', filters] }
      )
      .findAll();
    return manufacturers;
  }
}
