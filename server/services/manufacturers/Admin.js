import { models } from '@/database';
import { service, schema } from '@/lib/decorators';
import * as ERRORS from '@/config/errors';
import ServiceError from '@/lib/Errors';
import Utility from '@/services/manufacturers/Utility';
import { manufacturer as schemas } from '@/services/manufacturers/schemas';

@service
export default class Admin extends Utility {
  @schema(schemas.create)
  async create(data) {
    const manufacturer = await models.Manufacturer.create(data);
    return manufacturer;
  }

  @schema(schemas.identifier, schemas.update)
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

  @schema(schemas.identifier)
  async remove(id) {
    const count = await models.Manufacturer.destroy({
      where: { id }
    });
    if (!count) {
      throw new ServiceError('not found', ERRORS.MANUFACTURER_NOT_FOUND);
    }
  }
}
