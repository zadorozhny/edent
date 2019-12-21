import ServiceError from '@/lib/Errors';
import * as ERRORS from '@/config/errors';

export default class Factory {
  constructor(services) {
    Object.entries(services).forEach(([role, service]) => {
      Object.defineProperty(this, role, {
        get: () => service
      });
    });
  }
  init(user) {
    const service = user && user.role ? this[user.role] : this.default;
    if (!service) {
      throw new ServiceError('wrong', ERRORS.SOMETHING_WENT_WRONG);
    }
    return service.init(user);
  }
}
