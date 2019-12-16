import { OK } from '@/config';

export default class Factory {
  constructor(services) {
    Object.entries(services).forEach(([role, service]) => {
      Object.defineProperty(this, role, {
        get: () => service
      });
    });
  }
  init(options = {}) {
    const { user } = options;
    const service = user && user.role ? this[user.role] : this.default;
    if (!service) {
      throw new Error(OK);
    }
    return service.init(options);
  }
}
