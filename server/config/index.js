export const JWT = {
  PRIVATE_KEY: Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('utf8'),
  PUBLIC_KEY: Buffer.from(process.env.PUBLIC_KEY, 'base64').toString('utf8'),
  ALGORITHM: 'RS256'
};

export const ACCESS_TOKENS = {
  TYPE: 'access',
  EXPIRATION: '5m'
};

export const RESET_TOKENS = {
  TYPE: 'reset',
  EXPIRATION: 1800 // seconds in 30 minutes
};

export const REFRESH_TOKENS = {
  TYPE: 'refresh',
  EXPIRATION: 259200000 // milliseconds in 3 days
};
