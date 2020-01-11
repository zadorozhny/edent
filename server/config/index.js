export const JWT = {
  PRIVATE_KEY: Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('utf8'),
  PUBLIC_KEY: Buffer.from(process.env.PUBLIC_KEY, 'base64').toString('utf8'),
  ALGORITHM: 'RS256'
};

export const S3 = {
  ACCESS_KEY: process.env.S3_ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.S3_BUCKET_NAME,
  REGION: process.env.S3_REGION,
  URL: 'https://edent-bucket.s3.eu-central-1.amazonaws.com/'
};

export const ACCESS_TOKENS = {
  TYPE: 'access',
  EXPIRATION: '2h'
};

export const RESET_TOKENS = {
  TYPE: 'reset',
  EXPIRATION: 1800 // seconds in 30 minutes
};

export const REFRESH_TOKENS = {
  TYPE: 'refresh',
  EXPIRATION: 259200000 // milliseconds in 3 days
};

export const PASSWORDS = {
  LENGTH: 128,
  SALT_LENGTH: 128,
  ITERATIONS: 1000000,
  DIGEST: 'sha256',
  ENCODING: 'base64'
};
