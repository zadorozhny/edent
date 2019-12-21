import { AccessToken } from '@/lib/Tokens';
import * as ERRORS from '@/config/errors';

const auth = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    const user = AccessToken.verify(authorization);
    req.user = { ...user };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      err.status = 419;
      err.message = ERRORS.ACCESS_TOKEN_EXPIRED;
      next(err);
    }
    err.status = 401;
    err.message = ERRORS.WRONG_ACCESS_TOKEN;
    next(err);
  }
};

auth.expired = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    const user = AccessToken.verify(authorization, { ignoreExpiration: true });
    req.user = { ...user };
  } catch (err) {
    err.status = 401;
    err.message = ERRORS.WRONG_ACCESS_TOKEN;
    next(err);
  }
};

export default auth;
