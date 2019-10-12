import { AccessToken } from '@/lib/Tokens';

const auth = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    const user = AccessToken.verify(authorization);
    req.state.user = { ...user };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      err.status(418);
      next(err);
    }
    err.status(401);
    next(err);
  }
  await next();
};

auth.expired = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    const user = AccessToken.verify(authorization, { ignoreExpiration: true });
    req.state.user = { ...user };
  } catch (err) {
    err.status(401);
    next(err);
  }
  await next();
};

export default auth;