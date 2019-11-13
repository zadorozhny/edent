import ServiceError from '@/lib/Errors';

export const service = Service => class extends Service {
  constructor(options) {
    super(options);
    this.user = options.user;
  }
  static init(options) {
    return new Proxy(new this(options), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        throw new ServiceError('forbidden');
      }
    });
  }
};
