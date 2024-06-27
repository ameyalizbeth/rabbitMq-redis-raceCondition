import { redisConfig } from '../config/redis.config';
import Redis from 'ioredis';

const redisClient = new Redis(+redisConfig.port, redisConfig.host);

const MAX_CACHE_RETRY_ATTEMPTS = 3;
let cacheConnectionAttempts = 0;

redisClient.on('connect', () => {
  const key = 'orderCount';
  const value = 0;
  redisClient.set(key, value, (err, reply) => {
    if (err) {
      console.error('Error setting value:', err);
    } else {
      console.log('Value set successfully:', reply);
    }
  });
  console.log('Successfully connected to Redis Cache');
  cacheConnectionAttempts = 0;
});

redisClient.on('error', (cacheError) => {
  if (cacheConnectionAttempts >= MAX_CACHE_RETRY_ATTEMPTS) {
    console.log(
      `Could not connect to cache after ${cacheConnectionAttempts} attempts. Killing process.`,
    );
  }
  console.log('Error connecting to cache');
  console.log(cacheError.message);
  cacheConnectionAttempts++;
  process.exit(1);
});

export default redisClient;
