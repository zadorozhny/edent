import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const manufacturer = await models.Manufacturer.findByPk(id);
    return manufacturer;
  }

  async getList(filters) {
    const manufacturers = await models.Manufacturer
      .scope(
        { method: ['filter', filters] }
      )
      .findAll();
    return manufacturers;
  }
}
