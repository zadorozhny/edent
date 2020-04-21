import { service } from '@/lib/decorators';
import redis from '@/redis';

@service
export default class Utility {
  async find() {
    const warning = await redis.get('warning');
    return JSON.parse(warning);
  }
}
