import Redis from 'ioredis';
import { REDIS } from '@/config';

const redis = new Redis(REDIS.HOSTNAME);

export default redis;
