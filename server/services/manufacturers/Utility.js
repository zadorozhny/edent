import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const manufacturer = await models.Manufacturer.findByPk(id);
    return manufacturer;
  }

  async getList() {
    const manufacturers = await models.Manufacturers.findAll();
    return manufacturers;
  }
}
