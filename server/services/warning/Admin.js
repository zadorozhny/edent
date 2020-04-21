import { service, schema } from '@/lib/decorators';
import Utility from '@/services/warning/Utility';
import { warning as schemas } from '@/services/warning/schemas';
import redis from '@/redis';

@service
export default class Admin extends Utility {
  @schema(schemas.update)
  async update(data) {
    await redis.set('warning', JSON.stringify(data));
  }
}
