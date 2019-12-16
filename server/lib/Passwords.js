import crypto from 'crypto';
import { PASSWORDS } from '@/config';

const createHash = (password, salt) => (
  crypto.pbkdf2Sync(password, salt, PASSWORDS.ITERATIONS, PASSWORDS.LENGTH, PASSWORDS.DIGEST)
    .toString(PASSWORDS.ENCODING)
);
const createSalt = () => (
  crypto.randomBytes(PASSWORDS.SALT_LENGTH)
    .toString(PASSWORDS.ENCODING)
);

export default {
  hash: password => {
    const salt = createSalt();
    const hash = createHash(password, salt);
    return { salt, hash };
  },
  compare: (password, hash, salt) => (
    hash === createHash(password, salt)
  )
};
