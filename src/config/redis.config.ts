import '../config';

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  defaultTtl: process.env.REDIS_DEFAULT_TTL,
  defaultPrefix: process.env.REDIS_PREFIX,
};
