import ServiceError from '@/lib/Errors';
import * as ERRORS from '@/config/errors';

export const service = Service => class extends Service {
  constructor(user) {
    super(user);
    this.user = user;
  }
  static init(user) {
    return new Proxy(new this(user), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        throw new ServiceError('forbidden', ERRORS.FORBIDDEN);
      }
    });
  }
};
