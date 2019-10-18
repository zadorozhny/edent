export class ServiceError extends Error {
  constructor(type, context, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.type = type;
    this.context = context;
  }

  static statuses = {
    unique: 400,
    wrong: 400,
    expired: 400,
    unauthorised: 401,
    forbidden: 403,
    'not found': 404
  }
}
