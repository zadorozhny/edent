import { models } from '@/database';
import { service } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/manufacturers/Utility';

@service
export default class Admin extends Utility {
  async create(data) {
    const manufacturer = await models.Manufacturer.create(data);
    return manufacturer;
  }

  async update(id, data) {
    const [count, [manufacturer]] = await models.Manufacturer.update(data, {
      where: { id },
      returning: true
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.MANUFACTURER_NOT_FOUND);
    }
    return manufacturer;
  }

  async remove(id) {
    const count = await models.Manufacturer.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.MANUFACTURER_NOT_FOUND);
    }
  }
}
