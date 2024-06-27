import { Injectable } from '@nestjs/common';
import redisClient from '../util/redis';

@Injectable()
export class RedisService {
  async set(key: string, value: any): Promise<string> {
    return redisClient.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await redisClient.get(key);
    return JSON.parse(value);
  }

  async increment(key: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const transaction = redisClient.multi();

      transaction.incr(key);

      transaction.exec(
        (err: Error | null, replies: [Error | null, number][]) => {
          if (err) {
            reject(err);
          } else {
            const incrementedValue = replies[0][1] as number;
            resolve(incrementedValue);
          }
        },
      );
    });
  }
}
