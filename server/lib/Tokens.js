import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import redis from '@/redis';
import {
  JWT,
  ACCESS_TOKENS,
  REFRESH_TOKENS,
  RESET_TOKENS
} from '@/config';

export const AccessToken = {
  create(user) {
    return jwt.sign({ user }, JWT.PRIVATE_KEY, {
      algorithm: JWT.ALGORITHM,
      subject: ACCESS_TOKENS.TYPE,
      expiresIn: ACCESS_TOKENS.EXPIRATION
    });
  },
  verify(token, options) {
    const { user } = jwt.verify(token, JWT.PUBLIC_KEY, {
      ...options,
      algorithm: JWT.ALGORITHM,
      subject: ACCESS_TOKENS.TYPE
    });
    return user;
  },
  decode(token) {
    const { user } = jwt.decode(token);
    return user;
  }
};

export const ResetToken = {
  create(payload) {
    return jwt.sign({ payload }, JWT.PRIVATE_KEY, {
      algorithm: JWT.ALGORITHM,
      subject: RESET_TOKENS.TYPE,
      expiresIn: RESET_TOKENS.EXPIRATION
    });
  },
  verify(token, options) {
    const { payload } = jwt.verify(token, JWT.PUBLIC_KEY, {
      ...options,
      algorithm: JWT.ALGORITHM,
      subject: RESET_TOKENS.TYPE
    });
    return payload;
  },
  decode(token) {
    const { payload } = jwt.decode(token);
    return payload;
  }
};

export const RefreshToken = {
  create(key) {
    const token = crypto.randomBytes(128).toString('base64');
    redis.set(`${REFRESH_TOKENS.TYPE}:${key}`, token, 'EX', REFRESH_TOKENS.EXPIRATION);
    return token;
  },
  async verify(key, token) {
    return token === await redis.get(`${REFRESH_TOKENS.TYPE}:${key}`);
  },
  destroy(key) {
    redis.del(`${REFRESH_TOKENS.TYPE}:${key}`);
  }
};
